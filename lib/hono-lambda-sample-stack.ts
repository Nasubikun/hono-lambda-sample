import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as s3n from 'aws-cdk-lib/aws-s3-notifications'

export class HonoLambdaSampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const bucket = new s3.Bucket(this, 'UploadBucket', {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    })

    const fn = new NodejsFunction(this, 'LambdaHandler', {
      entry: 'lambda/handler.ts',
      handler: 'handler',
      runtime: lambda.Runtime.NODEJS_22_X,
    })

    bucket.grantReadWrite(fn)

    bucket.addEventNotification(
      s3.EventType.OBJECT_CREATED_PUT,
      new s3n.LambdaDestination(fn)
    )

    const fnUrl = fn.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.AWS_IAM,
    })

    new cdk.CfnOutput(this, 'lambdaUrl', {
      value: fnUrl.url!,
    })
    new cdk.CfnOutput(this, 'bucketName', {
      value: bucket.bucketName,
    })
  }
}
