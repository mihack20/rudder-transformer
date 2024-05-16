import { Router } from 'jsr:@oak/oak/router';
import { UserTransformController } from '../controllers/userTransformerController.ts';

const router = new Router();

router.get('/health', (context) => {
  context.response.status = 204;
});

router.post('/customTransform', UserTransformController.transform);

export default router;
