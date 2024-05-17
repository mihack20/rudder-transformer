import { setOpenFaasUserTransform, runOpenFaasUserTransform } from './customTransformer-faas.ts';
import { userTransformHandlerV1, setUserTransformHandlerV1 } from './customTransformer-v1.ts';

export const UserTransformHandlerFactory = (userTransformation) => ({
  setUserTransform: async (libraryVersionIds) => {
    // eslint-disable-next-line sonarjs/no-small-switch
    switch (userTransformation.language) {
      case 'pythonfaas':
        return setOpenFaasUserTransform(userTransformation, libraryVersionIds);
      default:
        return setUserTransformHandlerV1();
    }
  },

  runUserTransfrom: async (events, testMode, libraryVersionIds) => {
    switch (userTransformation.language) {
      case 'pythonfaas':
      case 'python':
        return runOpenFaasUserTransform(events, userTransformation, libraryVersionIds, testMode);

      default:
        return userTransformHandlerV1(events, userTransformation, libraryVersionIds, testMode);
    }
  },
});
