import { Stack, StackProps, CfnOutput } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as path from "path";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as apigw from "aws-cdk-lib/aws-apigateway";

interface AppStackProps extends StackProps {
  Name: string;
}

export class ApplicationStack extends Stack {
  public readonly urlOutput: CfnOutput;
  private DemoApi: apigw.RestApi;
  private BackendLambda: lambda.Function;

  constructor(scope: Construct, id: string, props: AppStackProps) {
    super(scope, id, props);

    this.BackendLambda = new lambda.Function(this, "Lambda", {
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: "index.main",
      code: lambda.Code.fromAsset(path.join(__dirname, `../src`)),
    });

    this.DemoApi = new apigw.RestApi(
      this,
      `${process.env.WebServiceName}-RestAPI`,
      {
        deployOptions: {
          stageName: "v1",
          metricsEnabled: true,
          loggingLevel: apigw.MethodLoggingLevel.INFO,
        },
      }
    );

    const DemoResourceSearch = this.DemoApi.root.resourceForPath("demo/search");
    const DemoResourceAdd = this.DemoApi.root.resourceForPath("demo/add");

    DemoResourceSearch.addResource("{FullName}").addMethod(
      "GET",
      new apigw.LambdaIntegration(this.BackendLambda)
    );

    this.urlOutput = new CfnOutput(this, "Url", {
      value: this.DemoApi.urlForPath(DemoResourceSearch.path),
    });
  }
}
