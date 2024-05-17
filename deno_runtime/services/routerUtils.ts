/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import { userTransformHandler as _userTransformHandler } from './utils/customTransformer.ts';

let areFunctionsEnabled = -1;
const functionsEnabled = () => {
  if (areFunctionsEnabled === -1) {
    areFunctionsEnabled = process.env.ENABLE_FUNCTIONS === 'false' ? 0 : 1;
  }
  return areFunctionsEnabled === 1;
};

export const userTransformHandler = () => {
  if (functionsEnabled()) {
    return _userTransformHandler;
  }
  throw new Error('Functions are not enabled');
};
