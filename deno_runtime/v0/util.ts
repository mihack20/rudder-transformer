export const isNonFuncObject = (value) => {
  const type = typeof value;
  return value != null && type === 'object' && !Array.isArray(value);
};

export const getMetadata = (metadata) => ({
  sourceType: metadata.sourceType,
  destinationType: metadata.destinationType,
  k8_namespace: metadata.namespace,
});

export const getTransformationMetadata = (metadata) => ({
  transformationId: metadata.transformationId,
  workspaceId: metadata.workspaceId,
});
