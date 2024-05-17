import ivm from 'npm:isolated-vm';
import { getFactory } from './ivmFactory.ts';
import { getMetadata, getTransformationMetadata } from '../../v0/util.ts';
import logger from '../../logger.ts';
import stats from '../../utils/stats.ts';

const userTransformTimeout = parseInt(process.env.USER_TRANSFORM_TIMEOUT || '600000', 10);

async function transform(isolatevm, events) {
  const transformationPayload: any = {};
  transformationPayload.events = events;
  transformationPayload.transformationType = isolatevm.fName;
  // eslint-disable-next-line no-async-promise-executor
  const executionPromise = new Promise(async (resolve, reject) => {
    const sharedTransformationPayload = new ivm.ExternalCopy(transformationPayload).copyInto({
      transferIn: true,
    });
    try {
      await isolatevm.bootstrapScriptResult.apply(
        undefined,
        [
          isolatevm.fnRef,
          new ivm.Reference(resolve),
          new ivm.Reference(reject),
          sharedTransformationPayload,
        ],
        { timeout: 4000 },
      );
    } catch (error: any) {
      reject(error.message);
    }
  });

  let setTimeoutHandle;
  const timeoutPromise = new Promise((_, reject) => {
    setTimeoutHandle = setTimeout(() => {
      reject(new Error('Timed out'));
    }, userTransformTimeout);
  });
  return Promise.race([executionPromise, timeoutPromise])
    .catch((e) => {
      throw new Error(e);
    })
    .finally(() => clearTimeout(setTimeoutHandle));
}

function calculateMsFromIvmTime(value) {
  return (value[0] + value[1] / 1e9) * 1000;
}

export async function userTransformHandlerV1(
  events,
  userTransformation,
  libraryVersionIds,
  testMode = false,
) {
  if (!userTransformation.versionId) {
    return { transformedEvents: events };
  }

  const isolatevmFactory = await getFactory(
    userTransformation.code,
    libraryVersionIds,
    userTransformation.versionId,
    userTransformation.secrets || {},
    testMode,
  );

  logger.debug(`Creating IsolateVM`);
  const isolatevm = await isolatevmFactory.create();

  const invokeTime = new Date();
  let transformedEvents;
  let logs;
  let transformationError;

  try {
    transformedEvents = await transform(isolatevm, events);
    logs = isolatevm.logs;
  } catch (err: any) {
    logger.error(`Error encountered while executing transformation: ${err.message}`);
    transformationError = err;
    throw err;
  } finally {
    logger.debug(`Destroying IsolateVM`);
    isolatevmFactory.destroy(isolatevm);
    // send the observability stats
    const tags = {
      identifier: 'v1',
      errored: !!transformationError,
      ...(events.length && events[0].metadata ? getMetadata(events[0].metadata) : {}),
      ...(events.length && events[0].metadata ? getTransformationMetadata(events[0].metadata) : {}),
    };
    stats.counter('user_transform_function_input_events', events.length, tags);
    stats.timing('user_transform_function_latency', invokeTime, tags);
  }

  return { transformedEvents, logs };
}

export async function setUserTransformHandlerV1() {
  return { success: true };
}
