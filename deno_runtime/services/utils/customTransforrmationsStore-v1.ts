import { fetchWithProxy } from './fetch.ts';
import logger from '../../logger.ts';
import { responseStatusHandler } from './utils.ts';
import stats from '../../utils/stats.ts';

const transformationCache = {};
const libraryCache = {};
const rudderLibraryCache = {};

// const CONFIG_BACKEND_URL = 'http://localhost:5000';
const CONFIG_BACKEND_URL = process.env.CONFIG_BACKEND_URL || 'https://api.rudderlabs.com';
const getTransformationURL = `${CONFIG_BACKEND_URL}/transformation/getByVersionId`;
const getLibrariesUrl = `${CONFIG_BACKEND_URL}/transformationLibrary/getByVersionId`;
const getRudderLibrariesUrl = `${CONFIG_BACKEND_URL}/rudderstackTransformationLibraries`;

// Gets the transformation from config backend.
// Stores the transformation object in memory with time to live after which it expires.
// VersionId is updated any time user changes the code in transformation, so there wont be any stale code issues.
export async function getTransformationCodeV1(versionId) {
  const transformation = transformationCache[versionId];
  if (transformation) return transformation;
  const tags = {
    versionId,
    version: 1,
  };
  try {
    const url = `${getTransformationURL}?versionId=${versionId}`;
    const startTime = new Date();
    const response = await fetchWithProxy(url);

    responseStatusHandler(response.status, 'Transformation', versionId, url);
    stats.increment('get_transformation_code', { success: 'true', ...tags });
    stats.timing('get_transformation_code_time', startTime, tags);
    const myJson = await response.json();
    transformationCache[versionId] = myJson;
    return myJson;
  } catch (error) {
    logger.error(error);
    stats.increment('get_transformation_code', { success: 'false', ...tags });
    throw error;
  }
}

export async function getLibraryCodeV1(versionId) {
  const library = libraryCache[versionId];
  if (library) return library;
  const tags = {
    libraryVersionId: versionId,
    version: 1,
  };
  try {
    const url = `${getLibrariesUrl}?versionId=${versionId}`;
    const startTime = new Date();
    const response = await fetchWithProxy(url);

    responseStatusHandler(response.status, 'Transformation Library', versionId, url);
    stats.increment('get_libraries_code', { success: 'true', ...tags });
    stats.timing('get_libraries_code_time', startTime, tags);
    const myJson = await response.json();
    libraryCache[versionId] = myJson;
    return myJson;
  } catch (error) {
    logger.error(error);
    stats.increment('get_libraries_code', { success: 'false', ...tags });
    throw error;
  }
}

export async function getRudderLibByImportName(importName) {
  const rudderLibrary = rudderLibraryCache[importName];
  if (rudderLibrary) return rudderLibrary;
  const tags = {
    libraryVersionId: importName,
    version: 1,
    type: 'rudderlibrary',
  };
  try {
    const [name, version] = importName.split('/').slice(-2);
    const url = `${getRudderLibrariesUrl}/${name}?version=${version}`;
    const startTime = new Date();
    const response = await fetchWithProxy(url);

    responseStatusHandler(response.status, 'Rudder Library', importName, url);
    stats.increment('get_libraries_code', { success: 'true', ...tags });
    stats.timing('get_libraries_code_time', startTime, tags);
    const myJson = await response.json();
    rudderLibraryCache[importName] = myJson;
    return myJson;
  } catch (error) {
    logger.error(error);
    stats.increment('get_libraries_code', { success: 'false', ...tags });
    throw error;
  }
}
