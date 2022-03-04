import React, { useState, useCallback, useEffect } from "react";

import styled from "styled-components";

import { Button, Stack, ThemeProvider } from "@shopify/polaris";

import {useScroll} from './../../hooks/useScroll'

import LoginSignup from "../../components/login-sigup/index";

import Logo from "../../assets/logo-with-name.svg";

// inspired by: https://dev.to/pratiksharm/navbar-hide-and-show-on-scroll-using-custom-react-hooks-1k98

const Wrapper = styled.div<WrapperProps>`
  display: flex;
  width: 100%;
  justify-content: center;
  background-color: #fff;
  height: 100px;
  ${props => props.activeAndNotHidden ? "visibility: visible;transition:all 0.5s;" : "visibility: hidden;transition:all 0.5s;transform: translateY(-100%);"}
`;

interface WrapperProps {
  readonly activeAndNotHidden?: boolean;
}

const TopBar = styled.div`
  width: 100%;
  margin: 20px 0 20px 0;
  max-width: 720px;
`;

function Topbar() {
  const [active, setActive] = useState(false);
  const { scrollDirection } = useScroll();  
  
  const activator = (
      <Button primary onClick={() => setActive(!active)}>
        Sign Up
      </Button>
  );
  return (
    <Wrapper activeAndNotHidden={scrollDirection == "down"}>
      <TopBar>
        <Stack alignment="center">
          <Stack.Item fill>
            <img src={Logo} alt="logo" style={{ height: "60px" }} />
          </Stack.Item>
          <Stack.Item>
            <Button url="about" plain monochrome removeUnderline>
              About
            </Button>
          </Stack.Item>
          <Stack.Item>
            <Button url="faq" plain monochrome removeUnderline>
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
