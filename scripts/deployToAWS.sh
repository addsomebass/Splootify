react-scripts build
aws --profile martinaws s3 sync build/ s3://com.splootify/  --acl public-read