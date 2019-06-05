# AWS S3 Static site CDK
Boilerplate for creating the infrastructure for a static S3 website using AWS CDK and deploying the website.

The site redirects from HTTP to HTTPS, using a CloudFront distribution, Route53 alias record, and ACM certificate.

Based on the [official CDK example](https://github.com/aws-samples/aws-cdk-examples/tree/master/typescript/static-site), but with a bunch of improvements. Subdomain is no longer required and deploying the content to S3 has been made easier.

## Prep
The ACM certificate is expected to be created and validated outside of the CDK, with the certificate ARN stored in an AWS Systems Manager Parameter Store parameter with the name `CertificateArn-subdomain.domain.domainextension`.

```
$ aws ssm put-parameter --region eu-west-1 --name CertificateArn-www.mystaticsite.com --type String --value arn:aws:acm:...
```

## Deployment

### 1. Install/verify dependencies

The following dependecines need to be installed and configured:
- AWS cli
- jq
- Node 10+

### 2. Deploy infrastructure
```
$ cd aws
$ npm i
$ npm run deploy -- -c domain=mystaticsite.com -c subdomain=www
```
subdomain is optional.

This might take a while as creating the cloudfront distribution for the first time can take up to 30 minutes.

### 3. Deploy site content
Modify content inside `website/src/index.html` as you please.

To deploy run
```
$ ./website/deploy.sh
```

### Updating site content
Just run step 3 again. 
You will only need to re-deploy the infrastructure if you make changes to the domain. In that case just run step 2 again with the new domain parameters.

## Delete static site
You can delete the entire stack with
```
$ cd aws
$ npm run destroy -- -c domain=mystaticsite.com
```

or by deleting the stack manually in AWS cloudformation control panel.

Note that the s3 bucket will not be removed. If you want to re-deploy the infrastructure with the same domain and subdomain, you need to delete the previously created s3 bucket.
