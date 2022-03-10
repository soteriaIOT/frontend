import React, { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Stack, TextField, Form, InlineError } from "@shopify/polaris";

import {gql, useQuery, useMutation} from "@apollo/client";


import useAuth from '../../hooks/useAuth'


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
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const auth = useAuth();

  const handleModalChange = useCallback(() => setActive(!active), [active]);

  const handleClose = () => {
    handleModalChange();
  };

  const handleSubmit = useCallback(async () => {
    setSubmitted(true);
    if (loginNotSignup) {
      if(await auth.signin(email, password)){
        setSubmitted(false);
        navigate("/dashboard", {replace: true})
      } else {
        setError("Invalid email or password");
        setSubmitted(false);
      }
    } else {
      setSubmitted(false);
      return;
      if(await auth.signup(name, email, password)){

        setSubmitted(false);
        navigate("/dashboard", {replace: true})
      } else {
        setError("Invalid email or password");
        setSubmitted(false);
      }
    }
  }, [loginNotSignup, email, name, password, setSubmitted, setError, auth, navigate]);

  return (
    <div style={{ height: "500px" }}>
      <Modal
        open={active}
        loading={submitted}
        onClose={handleClose}
        title="Login"
        primaryAction={{
          content: loginNotSignup ? "Login" : "Signup",
          onAction: handleSubmit,
        }}
        secondaryActions={[
          {
            content: loginNotSignup ? "Sign up" : "Login",
            onAction: () => setLoginNotSignup(!loginNotSignup),
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
                {error !== "" && <InlineError message={error} fieldID="password" />}
              </Form>
            </Stack.Item>
          </Stack>
        </Modal.Section>
      </Modal>
    </div>
  );
}
