import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
  service: 's3uploader',
  frameworkVersion: '2',
  plugins: ['serverless-esbuild', 'serverless-dynamodb-local','serverless-offline'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    region: "us-east-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
    lambdaHashingVersion: '20201221',
    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: ["s3:*"],
        Resource: ["*"]
      }
    ]
  },

  functions: { 
    s3Uploader: {
      handler: "src/functions/s3Uploader.handler",
      timeout: 30,
      events: [{
        http: {
          method: 'POST',
          path: '/upload',
        }
      }]
    }
   },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
      external: ['axios']
    },
  },
};

module.exports = serverlessConfiguration;
