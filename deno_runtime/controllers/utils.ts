const API_VERSION = '2';

export const postProcess = (ctx: any, status = 200) => {
  ctx.set('apiVersion', API_VERSION);
  ctx.status = status;
};
