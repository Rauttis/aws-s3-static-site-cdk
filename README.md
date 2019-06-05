# AWS S3 Static site CDK
Boilerplate for creating the infrastructure for a static S3 website using AWS CDK and deploying the website.

The site redirects from HTTP to HTTPS, using a CloudFront distribution, Route53 alias record, and ACM certificate.

Based on the [official CDK example](https://github.com/aws-samples/aws-cdk-examples/tree/master/typescript/static-site), but with a bunch of improvements. Subdomain is no longer required and deploying the content to S3 has been made easier.

## Prep
The ACM certificate is expected to be created and validated outside of the CDK, with the certificate ARN stored in an AWS Systems Manager Parameter Store parameter.

```
$ aws ssm put-parameter --region eu-west-1 --name CertificateArn-www.mystaticsite.com --type String --value arn:aws:acm:...
```

## Deployment

### 1. Install/verify Dependencies

The following dependecines need to be installed and configured:
- AWS cli
- jq
- Node 10+

### 2. Deploy Infrastructure
```
$ cd aws
$ npm i
$ npm run deploy -- -c domain=mystaticsite.com -c subdomain=www
```
subdomain is optional.

### 3. Deploy Site Content
Modify content inside `website/src/index.html` as you please.

To deploy run
```
$ ./website/deploy.sh
```

## Delete static site
You can delete the entire stack with
```
$ cd aws
$ npm run destroy -- -c domain=mystaticsite.com
```

or by deleting the stack manually in AWS cloudformation control panel.
