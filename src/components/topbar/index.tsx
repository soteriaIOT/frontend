import React, { useState, useCallback, useEffect } from "react";

import styled from "styled-components";

import { Button, Stack, Layout } from "@shopify/polaris";

import LoginSignup from "../../components/login-sigup/index";

import Logo from "../../assets/logo-with-name.svg";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  background-color: #fff;
  height: 100px;
`;

const TopBar = styled.div`
  width: 100%;
  margin: 20px 0 20px 0;
  max-width: 720px;
`;

function Topbar() {
  const [active, setActive] = useState(false);

  const activator = (
    <Button primary onClick={() => setActive(!active)}>
      Sign Up
    </Button>
  );
  return (
    <Wrapper>
      <TopBar>
        <Stack alignment="center">
          <Stack.Item fill>
            <img src={Logo} alt="logo" style={{ height: "60px" }} />
          </Stack.Item>
          <Stack.Item>
            <Button plain monochrome>
              About
            </Button>
          </Stack.Item>
          <Stack.Item>
            <Button plain monochrome>
              FAQ
            </Button>
          </Stack.Item>
          <Stack.Item>{activator}</Stack.Item>
        </Stack>
      </TopBar>
      <LoginSignup
        active={active}
        setActive={(value: boolean) => setActive(value)}
      />
    </Wrapper>
  );
}

export default Topbar;
