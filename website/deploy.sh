#/bin/bash

set -e

cd "$(dirname "$0")"

STACK_NAME="StaticSite"
STACK=$(aws cloudformation describe-stacks --stack-name $STACK_NAME)
BUCKET_NAME=$(echo $STACK | jq -r ".Stacks[0].Outputs[] | select(.OutputKey|test(\"^StaticSiteBucket.*$\")) | .OutputValue")
DISTRIBUTION_ID=$(echo $STACK | jq -r ".Stacks[0].Outputs[] | select(.OutputKey|test(\"^StaticSiteDistributionId.*$\")) | .OutputValue")

echo Bucket: $BUCKET_NAME
echo Distribution id: $DISTRIBUTION_ID

aws s3 sync ./src s3://$BUCKET_NAME
aws cloudfront create-invalidation --distribution-id $DISTRIBUTION_ID --paths "/*"
