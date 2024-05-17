/* eslint-disable @typescript-eslint/return-await */
import HttpsProxyAgent from 'npm:https-proxy-agent';
import lodash from 'npm:lodash';
import { RetryRequestError } from './utils.ts';

export const fetchWithProxy = async (url, options = {}) => {
  try {
    const instanceOptions = {
      ...options,
    };

    if (!options.agent && Deno.env.HTTPS_PROXY) {
      instanceOptions.agent = new HttpsProxyAgent(Deno.env.HTTPS_PROXY);
    }

    if (lodash.isEmpty(instanceOptions)) {
      return await fetch(url);
    }
    return await fetch(url, instanceOptions);
  } catch (err) {
    throw new RetryRequestError(`Invalid url: ${url}`);
  }
};
