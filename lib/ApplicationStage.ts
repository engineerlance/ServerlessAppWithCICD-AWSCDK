import { ApplicationStack } from "./ApplicationStack";
import { Stage, StageProps, CfnOutput } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as dotenv from "dotenv";
dotenv.config();

export class ApplicationStage extends Stage {
  public readonly urlOutput: CfnOutput;

  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);
    const service = new ApplicationStack(
      this,
      `${process.env.WebServiceName}-WebService`,
      {
        Name: process.env.WebServiceName as string,
      }
    );

    this.urlOutput = service.urlOutput;
    console.log(this.urlOutput);
  }
}
