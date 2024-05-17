import _ from 'npm:lodash'; 
import { RespStatusError, RetryRequestError } from '../utils/utils.ts';
import { getMetadata, getTransformationMetadata, isNonFuncObject } from '../v0/util.ts';
import logger from '../logger.ts';
import stats from '../utils/stats.ts';
import { userTransformHandler } from './routerUtils.ts';
// eslint-disable-next-line import/extensions
import { CommonUtils } from '../utils/common.ts';
import { FeatureFlags, FEATURE_FILTER_CODE } from '../middleware/featureFlag.ts';
import { HTTP_CUSTOM_STATUS_CODES } from '../constants.ts';

export class UserTransformService {
  public static async transformRoutine(
    events: any[],
    features: FeatureFlags = {},
    requestSize = 0,
  ): Promise<any> {
    let retryStatus = 200;
    const groupedEvents: NonNullable<unknown> = _.groupBy(
      events,
      (event: any) => `${event.metadata.destinationId}_${event.metadata.sourceId}`,
    );
    stats.counter('user_transform_function_group_size', Object.entries(groupedEvents).length, {});
    stats.histogram('user_transform_input_events', events.length, {});

    const transformedEvents: any[] = [];
    let librariesVersionIDs: any[] = [];
    if (events[0].libraries) {
      librariesVersionIDs = events[0].libraries.map((library: any) => library.VersionID);
    }
    const responses = await Promise.all<any>(
      Object.entries(groupedEvents).map(async ([, destEvents]) => {
        const eventsToProcess = destEvents as any[];
        const transformationVersionId =
          eventsToProcess[0]?.destination?.Transformations[0]?.VersionID;
        const messageIds: string[] = [];
        const messageIdsSet = new Set<string>();
        const messageIdMetadataMap: any = {};
        eventsToProcess.forEach((ev) => {
          messageIds.push(ev.metadata?.messageId);
          messageIdsSet.add(ev.metadata?.messageId);
          messageIdMetadataMap[ev.metadata?.messageId] = ev.metadata;
        });

        const messageIdsInOutputSet = new Set<string>();

        const commonMetadata = {
          sourceId: eventsToProcess[0]?.metadata?.sourceId,
          destinationId: eventsToProcess[0]?.metadata.destinationId,
          destinationType: eventsToProcess[0]?.metadata.destinationType,
          workspaceId: eventsToProcess[0]?.metadata.workspaceId,
          messageIds,
        };

        const metaTags =
          eventsToProcess.length > 0 && eventsToProcess[0].metadata
            ? getMetadata(eventsToProcess[0].metadata)
            : {};

        if (!transformationVersionId) {
          const errorMessage = 'Transformation VersionID not found';
          logger.error(`[CT] ${errorMessage}`);
          transformedEvents.push({
            statusCode: 400,
            error: errorMessage,
            metadata: commonMetadata,
          } as any);
          return transformedEvents;
        }
        const userFuncStartTime = new Date();
        try {

          const destTransformedEvents: any[] = await userTransformHandler()(
            eventsToProcess,
            transformationVersionId,
            librariesVersionIDs,
          );


          const transformedEventsWithMetadata: any[] = [];
          destTransformedEvents.forEach((ev) => {
            // add messageId to output set
            if (ev.metadata?.messageId) {
              messageIdsInOutputSet.add(ev.metadata.messageId);
            } else if (ev.metadata?.messageIds) {
              ev.metadata.messageIds.forEach((id) => messageIdsInOutputSet.add(id));
            }
            if (ev.error) {
              transformedEventsWithMetadata.push({
                statusCode: 400,
                error: ev.error,
                metadata: _.isEmpty(ev.metadata) ? commonMetadata : ev.metadata,
              } as unknown as any);
              return;
            }
            if (!isNonFuncObject(ev.transformedEvent)) {
              transformedEventsWithMetadata.push({
                statusCode: 400,
                error: `returned event in events from user transformation is not an object. transformationVersionId:${transformationVersionId} and returned event: ${JSON.stringify(
                  ev.transformedEvent,
                )}`,
                metadata: _.isEmpty(ev.metadata) ? commonMetadata : ev.metadata,
              } as any);
              return;
            }
            transformedEventsWithMetadata.push({
              output: ev.transformedEvent,
              metadata: _.isEmpty(ev.metadata) ? commonMetadata : ev.metadata,
              statusCode: 200,
            } as any);
          });

          if (features[FEATURE_FILTER_CODE]) {
            // find difference between input and output messageIds
            const messageIdsNotInOutput = CommonUtils.setDiff(messageIdsSet, messageIdsInOutputSet);
            const droppedEvents = messageIdsNotInOutput.map((id) => ({
              statusCode: HTTP_CUSTOM_STATUS_CODES.FILTERED,
              metadata: {
                ...(_.isEmpty(messageIdMetadataMap[id]) ? commonMetadata : messageIdMetadataMap[id]),
                messageId: id,
                messageIds: null,
              },
            }));
            transformedEvents.push(...droppedEvents);
          }

          transformedEvents.push(...transformedEventsWithMetadata);
        } catch (error: any) {
          logger.error(error);
          let status = 400;
          const errorString = error.toString();
          if (error instanceof RetryRequestError) {
            // entire request needs to be retried i.e. request to transformer needs be retried
            retryStatus = error.statusCode;
          }
          if (error instanceof RespStatusError) {
            status = error.statusCode;
          }
          transformedEvents.push(
            ...eventsToProcess.map(
              (e) =>
                ({
                  statusCode: status,
                  metadata: e.metadata,
                  error: errorString,
                }) as any,
            ),
          );
          stats.counter('user_transform_errors', eventsToProcess.length, {
            status,
            ...metaTags,
            ...getTransformationMetadata(eventsToProcess[0]?.metadata),
          });
        } finally {
          stats.timing('user_transform_request_latency', userFuncStartTime, {
            ...metaTags,
            ...getTransformationMetadata(eventsToProcess[0]?.metadata),
          });

          stats.histogram('user_transform_batch_size', requestSize, {
            ...metaTags,
            ...getTransformationMetadata(eventsToProcess[0]?.metadata),
          });
        }

        stats.counter('user_transform_requests', 1, {});
        stats.histogram('user_transform_output_events', transformedEvents.length, {});
        return transformedEvents;
      }),
    );

    const flattenedResponses: any[] = responses.flat();
    return {
      transformedEvents: flattenedResponses,
      retryStatus,
    } as any;
  }
}
