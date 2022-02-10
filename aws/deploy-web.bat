cd ..\build
aws s3 sync ./ s3://algo-pop-react-test --delete
