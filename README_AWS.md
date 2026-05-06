# Deploying Password Vault to AWS (ECS / ECR)

This guide shows the minimal steps to deploy the `password-vault` Next.js app to AWS using Docker, Amazon ECR, and Amazon ECS (Fargate). The repository includes a `Dockerfile` and a GitHub Actions workflow to build and push the image.

Prerequisites
- An AWS account
- AWS CLI installed locally (for manual steps)
- An IAM user with permissions: ECR, ECS, IAM, CloudWatch, STS
- GitHub repository for this code

High-level steps
1. Create an ECR repository (or let the workflow create it).
2. Create an ECS cluster and service (Fargate) or use AWS Copilot to scaffold.
3. Store secrets as GitHub repository secrets: `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, `ECR_REPOSITORY`, `ECS_CLUSTER`, `ECS_SERVICE`, `ECS_TASK_FAMILY`, `ECS_EXECUTION_ROLE_ARN`, `MONGODB_URI`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`.
4. Push to `main` branch — the GitHub Actions workflow will build and push the Docker image to ECR, register a new task definition, and update the ECS service.

Commands (manual quickstart)
1. Create ECR repository (if you want to do it manually):

```bash
aws ecr create-repository --repository-name password-vault --region us-east-1
```

2. Create an ECS cluster (Console or CLI). For a simple test you can use the default VPC and subnets.

3. Create an IAM execution role for ECS tasks (if you don't have one). The role must have `AmazonECSTaskExecutionRolePolicy`.

4. Configure GitHub secrets (Repository Settings → Secrets):
- `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION` (e.g., `us-east-1`) 
- `ECR_REPOSITORY` (e.g., `password-vault`)
- `ECS_CLUSTER` (your cluster name)
- `ECS_SERVICE` (your ECS service name)
- `ECS_TASK_FAMILY` (task family name, e.g., `password-vault-task`)
- `ECS_EXECUTION_ROLE_ARN` (ARN of the execution role)
- `MONGODB_URI`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`

5. Push to `main` branch — GitHub Actions will run and deploy the app.

Notes & next steps
- This repository uses MongoDB Atlas; you can keep using it (no migration needed). Ensure `MONGODB_URI` is set in the secrets.
- For production: configure an Application Load Balancer and Route 53 domain + ACM certificate. The ECS service should be created with attachments to the ALB target group.
- If you prefer a simpler developer flow, consider using AWS Copilot (`copilot init`) — it will scaffold the ECS, ALB, and CI for you.

App Runner (simpler option)
 - If you want the easiest path to run the container without managing ECS details, use AWS App Runner. It deploys a container image from ECR and provides automatic HTTPS.
 - The repo includes a GitHub Actions workflow `.github/workflows/aws-deploy-apprunner.yml` that builds the Docker image, pushes it to ECR, and creates/updates an App Runner service.

Required GitHub secrets for App Runner flow:
 - `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`
 - `ECR_REPOSITORY` (e.g., `password-vault`)
 - `APP_RUNNER_SERVICE_NAME` (e.g., `password-vault-app`)
 - `MONGODB_URI`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`

Push to `main` to trigger the App Runner workflow. App Runner will expose the service with HTTPS; copy the URL from the App Runner console.

If you'd like, I can:
- Add a CloudFormation template to create the ECS cluster + ALB + necessary roles, or
- Scaffold an AWS Copilot configuration and CI, or
- Create a Terraform configuration that provisions the whole stack.
