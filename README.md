Test

docker-compose -f docker-compose-production.yml -p microservices up --build -d
docker-compose -f docker-compose-production.yml -p microservices up

terraform init
terraform plan
terraform apply -auto-approve

aws ssm get-parameter --name "/cloudfront/public-key-id" --with-decryption --query "Parameter.Value" --output text --profile terraform-user


cloudfront_distribution_id = "E275PW0S35OABM"
cloudfront_domain_name = "d3uzwbw4hoxv37.cloudfront.net"
ecs_asg_id = "ecs-cluster-asg"
ecs_cluster_id = "arn:aws:ecs:us-east-1:242201290212:cluster/ecs-cluster"
vpc_id = "vpc-0cff56eb85a526f72"


aws ssm get-parameter --name /aws/service/ecs/optimized-ami/amazon-linux-2/recommended/image_id --region us-east-1 --query "Parameter.Value" --output text --profile terraform-user

SERVICES=service-name-in-docker-compose-1 next-service-name next-service

aws-nuke nuke -c nuke-config.yaml --profile terraform-user #list resources will be delete
aws-nuke nuke -c nuke-config.yaml --no-dry-run --profile terraform-user #actual delete

