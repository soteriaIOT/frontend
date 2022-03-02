import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, Stack, TextField, Form, ThemeProvider } from "@shopify/polaris";
import * as AWS from "aws-sdk";
import { AWSError } from "aws-sdk";
import { GetItemOutput } from "aws-sdk/clients/dynamodb";

export default function LoginSignup({
  active,
  setActive,
}: {
  active: boolean;
  setActive: (value: boolean) => void;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginNotSignup, setLoginNotSignup] = useState(false);

  const navigate = useNavigate();

  AWS.config.update({ region: "us-east-2" });
  AWS.config.update({
    accessKeyId: "AKIASM7RO3GR6EFRV2X3",
    secretAccessKey: "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",
  });
  var ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

  const handleModalChange = useCallback(() => setActive(!active), [active]);

  const handleClose = () => {
    handleModalChange();
  };

  const handleLoginNotSignupChange = useCallback(
    () => setLoginNotSignup(!loginNotSignup),
    [loginNotSignup]
  );

  const handleSubmit = useCallback(() => {
    if (loginNotSignup) {
      const params = {
        TableName: "login-information",
        Key: {
          username: { S: email },
        },
      };
      ddb.getItem(params, function (err: AWSError, data: GetItemOutput) {
        if (err) {
          console.log("Error", err);
        } else {
          if (data.Item && data.Item.password.S === password) {
            console.log("Successfully authenticated.");
            navigate("/dashboard");
            handleModalChange();
          } else {
            console.log("Password is incorrect.");
          }
        }
      });
    } else {
      const params = {
        TableName: "login-information",
        Item: {
          username: { S: email },
          password: { S: password },
          name: { S: name },
        },
      };
      ddb.putItem(params, function (err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data);
          navigate("/dashboard");
          handleModalChange();
        }
      });
    }
  }, [email, name, password]);

  return (
    <div style={{ height: "500px" }}>
      <Modal
        open={active}
        onClose={handleClose}
        title="Login"
        primaryAction={{
          content: loginNotSignup ? "Login" : "Signup",
          onAction: handleSubmit,
        }}
        secondaryActions={[
          {
            content: loginNotSignup ? "Sign up" : "Login",
            onAction: handleLoginNotSignupChange,
          },
        ]}
      >
        <Modal.Section>
          <Stack vertical>
            <Stack.Item>
              <Form onSubmit={handleSubmit}>
                {!loginNotSignup && (
                  <TextField
                    requiredIndicator={true}
                    label="Name"
                    value={name}
                    onChange={(value) => setName(value)}
                    autoComplete="on"
                  />
                )}
                <TextField
                  requiredIndicator={true}
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(value) => setEmail(value)}
                  autoComplete="on"
                />
                <TextField
                  requiredIndicator={true}
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(value) => setPassword(value)}
                  autoComplete="off"
                />
              </Form>
            </Stack.Item>
          </Stack>
        </Modal.Section>
      </Modal>
    </div>
  );
}
