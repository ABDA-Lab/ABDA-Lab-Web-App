Test

docker-compose -f docker-compose-production.yml -p microservices up --build -d
docker-compose -f docker-compose-production.yml -p microservices up

terraform init
terraform plan
terraform apply -auto-approve

aws ssm get-parameter --name "/cloudfront/public-key-id" --with-decryption --query "Parameter.Value" --output text --profile terraform-user

