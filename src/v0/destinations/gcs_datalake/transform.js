const { processWarehouseMessage } = require('../../../warehouse');

const provider = 'gcs_datalake';

function process(event) {
  const whSchemaVersion = event.request.query.whSchemaVersion || 'v1';
  const whStoreEvent = event.destination.Config.storeFullEvent === true;
  return processWarehouseMessage(event.message, {
    metadata: event.metadata,
    whSchemaVersion,
    whStoreEvent,
    getDataTypeOverride: () => {},
    provider,
    sourceCategory: event.metadata ? event.metadata.sourceCategory : null,
    destConfig: event.destination?.Config,
    destinationId: event.destination.ID,
  });
}

module.exports = {
  provider,
  process,
};
