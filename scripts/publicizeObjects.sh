#!/bin/bash
BUCKET_NAME="com.splootify"

aws --profile martinaws s3api list-objects --bucket ${BUCKET_NAME} --query 'Contents[].{Key: Key}' --output text | while read Key
do
    aws --profile martinaws s3api put-object-acl --bucket ${BUCKET_NAME} --key "$Key" --acl public-read
    echo "$Key is now public"
done