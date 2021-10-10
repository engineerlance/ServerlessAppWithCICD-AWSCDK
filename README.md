# Serverless App using AWS CDK

This is a simple serverless application with a CICD pipeline using the Code suite, created in the context of demonstrating the AWS CDK (v2) !

## Table of Contents

- [Serverless App using AWS CDK](#serverless-app-using-aws-cdk)
  - [Table of Contents](#table-of-contents)
  - [Pre-requisites](#pre-requisites)
  - [Usage](#usage)

## Pre-requisites

- In order to be able to deploy this project, make sure to have the AWS CLI configured with a given profile to use.
- Make sure to have the aws cdk (v2) installed

## Usage

Before you deploy, make sure your AWS account is bootstrapped by running the following:

```bash
cdk bootstrap \
  --profile account-profile \
  --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess \
  aws://ACCOUNT/REGION
```

To deploy this project, run the following commands in the terminal:

```bash
npm i
cdk deploy --profile YourProfile
```
