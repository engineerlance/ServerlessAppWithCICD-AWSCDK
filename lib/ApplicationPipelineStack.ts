import { Stack, StackProps } from "aws-cdk-lib";
import * as codepipeline from "aws-cdk-lib/aws-codepipeline";
import { Repository } from "aws-cdk-lib/aws-codecommit";
import { Construct } from "constructs";
import {
  CdkPipeline,
  SimpleSynthAction,
  ShellScriptAction,
} from "aws-cdk-lib/pipelines";
import * as codepipeline_actions from "aws-cdk-lib/aws-codepipeline-actions";
import { ApplicationStage } from "./ApplicationStage";

interface ApplicationPipelineStackProps extends StackProps {
  RepositoryName: string;
}

export class ApplicationPipelineStack extends Stack {
  constructor(
    scope: Construct,
    id: string,
    props: ApplicationPipelineStackProps
  ) {
    super(scope, id, props);
    const repo = Repository.fromRepositoryName(
      this,
      "ServiceRepository",
      props.RepositoryName
    );
    const sourceArtifact = new codepipeline.Artifact();
    const cloudAssemblyArtifact = new codepipeline.Artifact();

    const pipeline = new CdkPipeline(this, "Pipeline", {
      pipelineName: "ServicePipeline",
      cloudAssemblyArtifact,

      sourceAction: new codepipeline_actions.CodeCommitSourceAction({
        actionName: "CodeCommit",
        output: sourceArtifact,
        repository: repo,
        branch: "master",
      }),
      synthAction: SimpleSynthAction.standardNpmSynth({
        sourceArtifact,
        cloudAssemblyArtifact,
        buildCommand: "npm run build",
      }),
    });
    const preprod = new ApplicationStage(this, "PreProd");
    const preprodStage = pipeline.addApplicationStage(preprod);

    preprodStage.addActions(
      new ShellScriptAction({
        actionName: "TestService",
        useOutputs: {
          ENDPOINT_URL: pipeline.stackOutput(preprod.urlOutput),
        },
        commands: [`curl $ENDPOINT_URL/${process.env.SearchTest}`],
      })
    );
  }
}
