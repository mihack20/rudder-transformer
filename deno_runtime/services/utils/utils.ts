/* eslint-disable max-classes-per-file, @typescript-eslint/return-await */
import http from 'node:http';
import https from 'node:https';
import { promises } from 'node:dns';
import util from 'node:util';
import logger from '../../logger.ts';
import stats from '../../utils/stats.ts';

const { Resolver } = promises;

const resolver = new Resolver();

const BLOCK_HOST_NAMES = Deno.env.BLOCK_HOST_NAMES || '';
const BLOCK_HOST_NAMES_LIST = BLOCK_HOST_NAMES.split(',');
const LOCAL_HOST_NAMES_LIST = ['localhost', '127.0.0.1', '[::]', '[::1]'];
const LOCALHOST_OCTET = '127.';
const RECORD_TYPE_A = 4; // ipv4

const staticLookup = (transformerVersionId) => async (hostname, _, cb) => {
  let ips;
  const resolveStartTime = new Date();
  try {
    ips = await resolver.resolve4(hostname);
  } catch (error: any) {
    logger.error(`DNS Error Code: ${error.code} | Message : ${error.message}`);
    stats.timing('fetch_dns_resolve_time', resolveStartTime, {
      transformerVersionId,
      error: 'true',
    });
    cb(null, `unable to resolve IP address for ${hostname}`, RECORD_TYPE_A);
    return;
  }
  stats.timing('fetch_dns_resolve_time', resolveStartTime, { transformerVersionId });

  if (ips.length === 0) {
    cb(null, `resolved empty list of IP address for ${hostname}`, RECORD_TYPE_A);
    return;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const ip of ips) {
    if (ip.startsWith(LOCALHOST_OCTET)) {
      cb(null, `cannot use ${ip} as IP address`, RECORD_TYPE_A);
      return;
    }
  }

  cb(null, ips[0], RECORD_TYPE_A);
};

const httpAgentWithDnsLookup = (scheme, transformerVersionId) => {
  const httpModule = scheme === 'http' ? http : https;
  return new httpModule.Agent({ lookup: staticLookup(transformerVersionId) });
};

const blockLocalhostRequests = (url) => {
  try {
    const parseUrl = new URL(url);
    const { hostname } = parseUrl;
    if (LOCAL_HOST_NAMES_LIST.includes(hostname) || hostname.startsWith(LOCALHOST_OCTET)) {
      throw new Error('localhost requests are not allowed');
    }
    if (BLOCK_HOST_NAMES_LIST.includes(hostname)) {
      throw new Error('blocked host requests are not allowed');
    }
  } catch (error: any) {
    throw new Error(`invalid url, ${error.message}`);
  }
};

const blockInvalidProtocolRequests = (url) => {
  if (!(url.startsWith('https') || url.startsWith('http'))) {
    throw new Error(`invalid protocol, only http and https are supported`);
  }
};

export const fetchWithDnsWrapper = async (transformerVersionId, ...args) => {
  if (Deno.env.DNS_RESOLVE_FETCH_HOST !== 'true') {
    return await fetch(...args);
  }

  if (args.length === 0) {
    throw new Error('fetch url is required');
  }
  const fetchURL = args[0].trim();
  blockLocalhostRequests(fetchURL);
  blockInvalidProtocolRequests(fetchURL);
  const fetchOptions = args[1] || {};
  const schemeName = fetchURL.startsWith('https') ? 'https' : 'http';
  // assign resolved agent to fetch
  fetchOptions.agent = httpAgentWithDnsLookup(schemeName, transformerVersionId);
  return await fetch(fetchURL, fetchOptions);
};

export class RespStatusError extends Error {
  statusCode: any;

  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 400;
  }
}

export class RetryRequestError extends RespStatusError {
  constructor(message) {
    // chosen random unique status code 809 to mark requests that needs to be retried
    super(message, 809);
  }
}

export const responseStatusHandler = (status, entity, id, url) => {
  if (status >= 500) {
    throw new RetryRequestError(`Error occurred while fetching ${entity} :: ${id}`);
  } else if (status !== 200) {
    throw new RespStatusError(`${entity} not found at ${url}`, status);
  }
};

const getIntegrationVersion = () => 'v0';
const sendViolationMetrics = (validationErrors, dropped, metaTags) => {
  const vTags = {
    'Unplanned-Event': 0,
    'Additional-Properties': 0,
    'Datatype-Mismatch': 0,
    'Required-Missing': 0,
    'Unknown-Violation': 0,
  };

  validationErrors.forEach((error) => {
    vTags[error.type] += 1;
  });

  Object.entries(vTags).forEach(([key, value]) => {
    if (value > 0) {
      stats.counter('hv_metrics', value, { ...metaTags, dropped, violationType: key });
    }
  });
  stats.counter('hv_metrics', validationErrors.length, {
    ...metaTags,
    dropped,
    violationType: 'Total',
  });
};

const constructValidationErrors = (validationErrors) =>
  validationErrors.reduce((acc, elem) => {
    if (!acc[elem.type]) {
      acc[elem.type] = [];
    }
    const validationObject: any = {};
    if (elem.property) {
      validationObject.property = elem.property;
    }
    if (elem.message) {
      validationObject.message = elem.message;
    }
    if (elem.meta?.schemaPath) {
      validationObject.schemaPath = elem.meta.schemaPath;
    }
    acc[elem.type].push(validationObject);
    return acc;
  }, {});

function processInfo() {
  return {
    pid: Deno.pid,
    ppid: Deno.ppid,
    mem: Deno.memoryUsage(),
    cpu: Deno.cpuUsage(),
    cmd: `${Deno.argv0} ${Deno.argv.join(' ')}`,
  };
}

function logProcessInfo() {
  logger.error(`Process info: `, util.inspect(processInfo(), false, null, true));
}

// stringLiterals expected to be an array of strings. A line in trace should contain
// atleast one string in the stringLiterals array for lastMatchingIndex to be updated appropriately.
export const extractStackTraceUptoLastSubstringMatch = (trace, stringLiterals) => {
  const traceLines = trace.split('\n');
  let lastRelevantIndex = 0;

  for (let i = traceLines.length - 1; i >= 0; i -= 1) {
    if (stringLiterals.some((str) => traceLines[i].includes(str))) {
      lastRelevantIndex = i;
      break;
    }
  }

  return traceLines.slice(0, lastRelevantIndex + 1).join('\n');
};
