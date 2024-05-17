// =============================================================================
// DEPRECATION NOTICE: THIS FILE IS GETTING DEPRECATED AND WILL BE REMOVED IN FUTURE RELEASE
// =============================================================================
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
import logger from '../logger.ts';
import stats from '../utils/stats.ts';
import { getMetadata } from '../v0/util.ts';
import eventValidator from '../utils/eventValidation.ts'

import {
    RespStatusError,
    RetryRequestError,
    sendViolationMetrics,
    constructValidationErrors,
  } from '../utils/utils.ts';


export async function handleValidation(ctx:any) {
    const requestStartTime = new Date();
    const events = await ctx.request.body.json()
    const requestSize = Number(ctx.request['content-length']);
    const reqParams = ctx.request.query;
    const respList:any[] = [];
    const metaTags = events[0].metadata ? getMetadata(events[0].metadata) : {};
    let ctxStatusCode = 200;
    // eslint-disable-next-line no-restricted-syntax
    for (const event of events) {
      const eventStartTime = new Date();
      try {
        const parsedEvent = event;
        parsedEvent.request = { query: reqParams };
        // eslint-disable-next-line no-await-in-loop
        const hv = await eventValidator.handleValidation(parsedEvent);
        sendViolationMetrics(hv.validationErrors, hv.dropEvent, metaTags);
        if (hv.dropEvent) {
          respList.push({
            output: event.message,
            metadata: event.metadata,
            statusCode: 400,
            validationErrors: hv.validationErrors,
            error: JSON.stringify(constructValidationErrors(hv.validationErrors)),
          });
          stats.counter('hv_violation_type', 1, {
            violationType: hv.violationType,
            ...metaTags,
          });
        } else {
          respList.push({
            output: event.message,
            metadata: event.metadata,
            statusCode: 200,
            validationErrors: hv.validationErrors,
            error: JSON.stringify(constructValidationErrors(hv.validationErrors)),
          });
          stats.counter('hv_propagated_events', 1, {
            ...metaTags,
          });
        }
      } catch (error) {
        const errMessage = `Error occurred while validating : ${error}`;
        logger.error(errMessage);
        let status = 200;
        if (error instanceof RetryRequestError) {
          ctxStatusCode = error.statusCode;
        }
        if (error instanceof RespStatusError) {
          status = error.statusCode;
        }
        respList.push({
          output: event.message,
          metadata: event.metadata,
          statusCode: status,
          validationErrors: [],
          error: errMessage,
        });
        stats.counter('hv_errors', 1, {
          ...metaTags,
        });
      } finally {
        stats.timing('hv_event_latency', eventStartTime, {
          ...metaTags,
        });
      }
    }
    ctx.response.body = respList;
    ctx.response.status = ctxStatusCode;
  
    stats.counter('hv_events_count', events.length, {
      ...metaTags,
    });
    stats.histogram('hv_request_size', requestSize, {
      ...metaTags,
    });
    stats.timing('hv_request_latency', requestStartTime, {
      ...metaTags,
    });
  }