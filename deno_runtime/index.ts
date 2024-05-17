import { Application } from 'jsr:@oak/oak/application';
import router from './routes/index.ts';

const app = new Application();
const port = parseInt(Deno.env.PORT ?? '9090', 10);

app.use(router.routes());
console.log(`Server running on http://0.0.0.0:${port}`);
await app.listen({ port });
