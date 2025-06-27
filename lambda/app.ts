import { createRoute, OpenAPIHono, z } from '@hono/zod-openapi';
import { Scalar } from '@scalar/hono-api-reference';
import { LambdaContext, LambdaEvent } from 'hono/aws-lambda';

type Bindings = {
    event: LambdaEvent;
    lambdaContext: LambdaContext;
  };

export const app = new OpenAPIHono<{ Bindings: Bindings }>()


const helloRoute = createRoute({
    method: 'get',
    path: '/hello',
    responses: {
        200: {
            description: 'Hello world',
            content: {
                'application/json': {
                    schema: z.object({
                        message: z.string(),
                    }),
                },
            },
        },
    }, 
})
const routes = app.openapi(helloRoute, (c) => c.json({ message: 'Hello Hono!' }))

export type AppType = typeof routes
app.doc('/doc', {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'My API',
    },
  });

app.get('/scalar', Scalar({ url: '/doc' }))