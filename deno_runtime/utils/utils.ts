/* eslint-disable max-classes-per-file */

import stats from './stats.ts';

export class RespStatusError extends Error {
  statusCode: number;

  constructor(message: any, statusCode: number) {
    super(message);
    this.statusCode = statusCode || 400;
  }
}

export class RetryRequestError extends RespStatusError {
  constructor(message: any) {
    // chosen random unique status code 809 to mark requests that needs to be retried
    super(message, 809);
  }
}

export const sendViolationMetrics = (validationErrors, dropped, metaTags) => {
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

export const constructValidationErrors = (validationErrors) =>
  validationErrors.reduce((acc, elem) => {
    if (!acc[elem.type]) {
      acc[elem.type] = [];
    }
    const validationObject:any = {};
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

  export const responseStatusHandler = (status, entity, id, url) => {
    if (status >= 500) {
      throw new RetryRequestError(`Error occurred while fetching ${entity} :: ${id}`);
    } else if (status !== 200) {
      throw new RespStatusError(`${entity} not found at ${url}`, status);
    }
  };