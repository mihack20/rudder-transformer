import { v4 as uuidv4 } from 'npm:uuid';
import crypto from 'npm:crypto';
import NodeCache from 'npm:node-cache';
import _ from 'npm:lodash';

import { getTransformationMetadata } from '../../v0/util.ts';
import stats from '../../utils/stats.ts';
// eslint-disable-next-line import/no-cycle
import { extractLibraries } from './customTransformer.ts';

import {
  setupFaasFunction,
  executeFaasFunction,
  FAAS_AST_FN_NAME,
  FAAS_AST_VID,
} from './openfaas/index.ts';

import { getLibraryCodeV1 } from './customTransforrmationsStore-v1.ts';

const libVersionIdsCache = new NodeCache();

export function generateFunctionName(userTransformation, libraryVersionIds, testMode) {
  if (userTransformation.versionId === FAAS_AST_VID) return FAAS_AST_FN_NAME;

  if (testMode) {
    const funcName = `fn-test-${uuidv4()}`;
    return funcName.substring(0, 63).toLowerCase();
  }

  const ids = [userTransformation.workspaceId, userTransformation.versionId].concat(
    (libraryVersionIds || []).sort(),
  );

  const hash = crypto.createHash('md5').update(`${ids}`).digest('hex');
  return `fn-${userTransformation.workspaceId}-${hash}`.substring(0, 63).toLowerCase();
}

async function extractRelevantLibraryVersionIdsForVersionId(
  functionName,
  code,
  versionId,
  libraryVersionIds,
  prepopulatedImports,
  testMode,
) {
  if (functionName === FAAS_AST_FN_NAME || versionId === FAAS_AST_VID) return [];

  const cachedLvids = libVersionIdsCache.get(functionName);

  if (cachedLvids) return cachedLvids;

  const libraries = await Promise.all(
    (libraryVersionIds || []).map(async (libraryVersionId) => getLibraryCodeV1(libraryVersionId)),
  );

  const codeImports =
    prepopulatedImports ||
    Object.keys(await extractLibraries(code, versionId, false, [], 'pythonfaas', testMode));

  const relevantLvids: any[] = [];

  if (libraries && codeImports) {
    libraries.forEach((library) => {
      const libHandleName = library.handleName || _.camelCase(library.name);
      if (codeImports.includes(libHandleName)) {
        relevantLvids.push(library.versionId);
      }
    });
  } else {
    throw new Error(`Failed to extract library version ids for function ${functionName}`);
  }

  libVersionIdsCache.set(functionName, relevantLvids);
  return relevantLvids;
}

export async function setOpenFaasUserTransform(
  userTransformation,
  libraryVersionIds,
  pregeneratedFnName?: any,
  testMode = false,
  trMetadata = {},
) {
  const tags = {
    transformerVersionId: userTransformation.versionId,
    identifier: 'openfaas',
    testMode,
  };
  const functionName =
    pregeneratedFnName || generateFunctionName(userTransformation, libraryVersionIds, testMode);
  const setupTime = new Date();

  await setupFaasFunction(
    functionName,
    userTransformation.code,
    userTransformation.versionId,
    await extractRelevantLibraryVersionIdsForVersionId(
      functionName,
      userTransformation.code,
      userTransformation.versionId,
      libraryVersionIds,
      userTransformation.imports,
      testMode,
    ),
    testMode,
    trMetadata,
  );

  stats.timing('creation_time', setupTime, tags);
  return { success: true, publishedVersion: functionName };
}
/**
 * Runs the user transformation code
 * In testMode, the function is deployed, executed and then deleted
 * In production mode, the function is executed directly
 * if function is not found, it is deployed and returns retryable error
 */
export async function runOpenFaasUserTransform(
  events,
  userTransformation,
  libraryVersionIds,
  testMode = false,
) {
  if (events.length === 0) {
    throw new Error('Invalid payload. No events');
  }

  const trMetadata = events[0].metadata ? getTransformationMetadata(events[0].metadata) : {};
  // check and deploy faas function if not exists
  const functionName = generateFunctionName(userTransformation, libraryVersionIds, testMode);
  if (testMode) {
    await setOpenFaasUserTransform(
      userTransformation,
      libraryVersionIds,
      functionName,
      testMode,
      trMetadata,
    );
  }

  return executeFaasFunction(
    functionName,
    events,
    userTransformation.versionId,
    await extractRelevantLibraryVersionIdsForVersionId(
      functionName,
      userTransformation.code,
      userTransformation.versionId,
      libraryVersionIds,
      userTransformation.imports,
      testMode,
    ),
    testMode,
    trMetadata,
  );
}
