import { APIGatewayProxyEvent, APIGatewayProxyHandler } from "aws-lambda";

export const main: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
) => {
  console.log("event 👉", event);
  if (event.pathParameters!.FullName) {
    return {
      body: JSON.stringify({
        message: `Hey ${
          event.pathParameters!.FullName
        } and welcome to the AWS CoP CDK Demo 🚀!`,
      }),
      statusCode: 200,
    };
  } else {
    return {
      body: JSON.stringify({
        message: `You have not passed a name`,
      }),
      statusCode: 400,
    };
  }
};
