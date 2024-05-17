import { Router } from 'jsr:@oak/oak/router';
// import { UserTransformController } from '../controllers/userTransformerController.ts';
import { handleValidation } from '../controllers/trackingPlan.ts';

const router = new Router();

router.get('/health', (context) => {
  context.response.status = 204;
});

// router.post('/customTransform', UserTransformController.transform);
router.post('/v0/validate', handleValidation);

export default router;
