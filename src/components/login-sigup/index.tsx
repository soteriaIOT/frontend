import React, { useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal, Stack, TextField, Form } from "@shopify/polaris";

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

  const navigate = useNavigate();
  const auth = useAuth();

  const handleModalChange = useCallback(() => setActive(!active), [active]);

  const handleClose = () => {
    handleModalChange();
  };

  const handleSubmit = useCallback(() => {
    if (loginNotSignup) {
        auth.signin("test", () => navigate("/dashboard", { replace: true }))
    } else {
        auth.signup("test", () => navigate("/dashboard", { replace: true }))
    }
  }, [loginNotSignup, email, name, password]);

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
              </Form>
            </Stack.Item>
          </Stack>
        </Modal.Section>
      </Modal>
    </div>
  );
}
