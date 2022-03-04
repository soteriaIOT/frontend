import React, { useState, useCallback, useEffect } from "react";

import styled from "styled-components";

import { Button, Stack, FooterHelp } from "@shopify/polaris";

import LoginSignup from "../../components/login-sigup/index";

import Logo from "../../assets/logo-with-name.svg";

const Wrapper = styled.div`
  margin-top: 20vh;
  display: flex;
  width: 100%;
  justify-content: center;
  height: 100px;
`;

const FooterDiv = styled.div`
  width: 100%;
  margin: 20px 0 20px 0;
  max-width: 720px;
`;

function Footer() {
  const [active, setActive] = useState(false);

  const activator = (
      <Button primary onClick={() => setActive(!active)}>
        Sign Up
      </Button>
  );
  return (
    <Wrapper>
      <FooterDiv>
        <Stack alignment="center">
          <Stack.Item fill>
            <img src={Logo} alt="logo" style={{ height: "60px" }} />
          </Stack.Item>
          <Stack.Item>
            <Button url="about" plain monochrome removeUnderline>
              About
            </Button>
          </Stack.Item>
          <Stack.Item>{activator}</Stack.Item>
        </Stack>
      </FooterDiv>
      <LoginSignup
        active={active}
        setActive={(value: boolean) => setActive(value)}
      />
    </Wrapper>
  );
}

export default Footer;
