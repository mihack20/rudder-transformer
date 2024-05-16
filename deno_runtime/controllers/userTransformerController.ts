export class UserTransformController {
  public static async transform(context) {
    context.response.body = 'works!';
  }
}
