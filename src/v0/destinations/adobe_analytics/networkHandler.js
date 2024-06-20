const { InstrumentationError, RetryableError } = require('@rudderstack/integrations-lib');
const { proxyRequest, prepareProxyRequest } = require('../../../adapters/network');
const { processAxiosResponse } = require('../../../adapters/utils/networkUtils');
const { DESTINATION } = require('./config');

/**
 * Extract data inside different tags from an xml payload
 * @param {*} xml
 * @param {*} tagName
 * @returns data inside the tagName
 */
function extractContent(xmlPayload, tagName) {
  const pattern = new RegExp(`<${tagName}>(.*?)</${tagName}>`);
  const match = xmlPayload.match(pattern);
  return match ? match[1] : null;
}

const responseHandler = (responseParams) => {
  const { destinationResponse, destType } = responseParams;

  const message = `[${DESTINATION}] - Request Processed Successfully`;
  const { response, status } = destinationResponse;
  if (status !== 200) {
    // handle non-200 status codes as network errors
    switch (status) {
      case 500 || 502 || 503 || 505:
        throw new RetryableError(
          `[${DESTINATION} Response Handler] Request failed for destination ${destType} with status code ${status} due to ${response}`,
        );
      case 504:
        throw new RetryableError(
          `[${DESTINATION} Response Handler] Request failed for destination ${destType} with status code ${status} due to Gateway Timeout`,
        );
      // all other scenarios should be retried by default
      default:
        throw new RetryableError(
          `[${DESTINATION} Response Handler] Request failed for destination ${destType} with status code ${status}`,
        );
    }
  }

  // Extract values between different tags
  const responseStatus = extractContent(response, 'status');
  const reason = extractContent(response, 'reason');

  // if the status tag in XML contains FAILURE, we build and throw an explicit error
  if (responseStatus === 'FAILURE') {
    if (reason) {
      throw new InstrumentationError(
        `[${DESTINATION} Response Handler] Request failed for destination ${destType} : ${reason}`,
      );
    } else {
      throw new InstrumentationError(
        `[${DESTINATION} Response Handler] Request failed for destination ${destType} with a general error`,
      );
    }
  }

  return {
    status,
    message,
    destinationResponse,
  };
};

function networkHandler() {
  this.responseHandler = responseHandler;
  this.proxy = proxyRequest;
  this.prepareProxy = prepareProxyRequest;
  this.processAxiosResponse = processAxiosResponse;
}

module.exports = {
  networkHandler,
};
