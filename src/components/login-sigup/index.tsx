import React, {useCallback, useState} from 'react';
import {Button, ChoiceList, Modal, Stack, TextField, Form, FormLayout} from '@shopify/polaris';

export default function LoginSignup({active, setActive}: {active: boolean, setActive: (value: boolean) => void}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginNotSignup, setLoginNotSignup] = useState(false);


  const handleModalChange = useCallback(() => setActive(!active), [active]);

  const handleClose = () => {
    handleModalChange();
  };

  const handleLoginNotSignupChange = useCallback(() => setLoginNotSignup(!loginNotSignup), [loginNotSignup]);

  const handleSubmit = useCallback(() => {
    console.log("submitted", name, email, password, loginNotSignup);
    setEmail('');
    setName('');
    setPassword('');
    handleModalChange();
  }, []);


  return (
    <div style={{height: '500px'}}>
      <Modal
        open={active}
        onClose={handleClose}
        title="Login"
        primaryAction={{
          content: loginNotSignup ? 'Login' : 'Signup',
          onAction: handleSubmit,
        }}
        secondaryActions={[
          {
            content: loginNotSignup ? 'Sign up' : 'Login',
            onAction: handleLoginNotSignupChange,
          },
        ]}
      >
        <Modal.Section>
          <Stack vertical>
            <Stack.Item>
                <Form onSubmit={handleSubmit}>
                    {!loginNotSignup && <TextField
                        requiredIndicator={true}
                        label="Name"
                        value={name}
                        onChange={(value) => setName(value)}
                        autoComplete="on"
                    />}
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
