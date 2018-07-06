#!/bin/bash

set -e
CODEBUILD_BUILD_SUCCEEDING="1"
AWS_SITE_BUCKET_NAME="sls-cf-houndstooth-ui-us-east-1-dev-site"
S3BUCKETNAME=$AWS_SITE_BUCKET_NAME
BUILD_BRANCH="master"
BUILD_TAG=${BUILD_NUMBER:-latest}
BRANCH_TARGETS=("master")

distribution_id="E1HRLVPUXS38W2"

should_deploy_branch() {
  if [[ "$CODEBUILD_BUILD_SUCCEEDING" != "1" ]]; then
    return 1
  fi

  for i in "${BRANCH_TARGETS[@]}"; do
    if [[ "$1" == "$i" ]]; then
      return 0
    fi
  done

  return 1
}

s3_sync() {
  echo "Sync build with s3 for build #$1"
  aws s3 sync build s3://$S3BUCKETNAME --delete --cache-control max-age=31536000,public
  aws s3 cp s3://$S3BUCKETNAME/service-worker.js s3://$S3BUCKETNAME/service-worker.js --metadata-directive REPLACE --cache-control max-age=0,no-cache,no-store,must-revalidate --content-type application/javascript --acl public-read
  aws s3 cp s3://$S3BUCKETNAME/index.html s3://$S3BUCKETNAME/index.html --metadata-directive REPLACE --cache-control max-age=0,no-cache,no-store,must-revalidate --content-type text/html --acl public-read
  # aws s3 sync build/ s3://$AWS_SITE_BUCKET_NAME/ --delete
  # aws s3 cp s3://$AWS_SITE_BUCKET_NAME/service-worker.js s3://$AWS_SITE_BUCKET_NAME/service-worker.js --metadata-directive REPLACE --cache-control max-age=0,no-cache,no-store,must-revalidate --content-type application/javascript --acl public-read
  # aws s3 cp s3://$AWS_SITE_BUCKET_NAME/index.html s3://$AWS_SITE_BUCKET_NAME/index.html --metadata-directive REPLACE --cache-control max-age=0,no-cache,no-store,must-revalidate --content-type text/html --acl public-read
}

if should_deploy_branch $BUILD_BRANCH; then
  # ./e2e.sh
  s3_sync $BUILD_TAG
  # Invalidate cache on CloudFront distribution
  echo "Create invalidation for CloudFront dist: '$distribution_id'"
  aws cloudfront create-invalidation --distribution-id $distribution_id --paths "/*"
else
  echo "Not deploying branch: $BUILD_BRANCH"
fi

echo "Finished!"