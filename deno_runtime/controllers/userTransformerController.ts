import logger from '../logger.ts';
import { UserTransformService } from '../services/userTransform.ts';
import { postProcess } from './utils.ts';

export class UserTransformController {
  public static async transform(ctx: any) {
    logger.debug(
      '(User transform - router:/customTransform ):: Request to transformer',
      ctx.request.body,
    );
    const requestSize = Number(ctx.request.get('content-length'));
    const events = ctx.request.body as any[];
    const processedRespone: any = await UserTransformService.transformRoutine(
      events,
      ctx.state.features,
      requestSize,
    );
    ctx.body = processedRespone.transformedEvents;
    postProcess(ctx, processedRespone.retryStatus);
    logger.debug(
      '(User transform - router:/customTransform ):: Response from transformer',
      ctx.response.body,
    );
    return ctx;
  }
}
