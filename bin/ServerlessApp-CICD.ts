#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { ApplicationPipelineStack } from "../lib/ApplicationPipelineStack";
import * as dotenv from "dotenv";
dotenv.config();

const app = new cdk.App();
new ApplicationPipelineStack(app, "ApplicationPipelineStack", {
  RepositoryName: process.env.RepositoryName as string,
});
