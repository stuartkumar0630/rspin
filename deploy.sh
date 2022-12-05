npm run build
aws s3 cp build  s3://taskspin --recursive
aws cloudfront create-invalidation --distribution-id "E2H162EQDCRLFT" --paths "/*"