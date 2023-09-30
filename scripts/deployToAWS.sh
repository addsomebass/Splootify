aws --profile martinaws s3 rm s3://com.splootify/ --recursive
npm run build
aws --profile martinaws s3 sync ./out s3://com.splootify/  --acl public-read