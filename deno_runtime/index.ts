import { Application } from 'jsr:@oak/oak/application';
import router from './routes/index.ts';

const app = new Application();

app.use(router.routes());
console.log('Server running on http://0.0.0.0:8000');
await app.listen({ port: 8000 });
