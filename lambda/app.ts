import { S3Event } from 'aws-lambda';
import { Hono } from 'hono'
import { LambdaContext, LambdaEvent } from 'hono/aws-lambda';

type Bindings = {
    event: LambdaEvent;
    lambdaContext: LambdaContext;
  };

export const app = new Hono<{ Bindings: Bindings }>()

app.get('/', (c) => {
    if ('Records' in c.env.event) {
        console.log('AWS TRIGGER EVENT - audio uploaded S3: ', c.env.event);
        const s3Event = c.env.event as S3Event;
        const bucket = s3Event.Records[0].s3.bucket.name;
        const objectKey = decodeURIComponent(
          s3Event.Records[0].s3.object.key.replace(/\+/g, ' '),
        );

        console.log('Bucket: ', bucket);
        console.log('Object Key: ', objectKey);

        return c.json({ message: 'Done handling new s3 event' }, 200);
    }
    return c.text('Hello Hono!');
})