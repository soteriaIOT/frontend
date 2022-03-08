import React, { useState, useCallback, useEffect } from "react";

import styled from "styled-components";

import { Button, Stack, ThemeProvider } from "@shopify/polaris";

import {useScroll} from './../../hooks/useScroll'

import LoginSignup from "../../components/login-sigup/index";

import Logo from "../../assets/logo-with-name.svg";
import LogoIcon from "../../assets/logo-icon.svg";
import useWindowDimensions from "../../hooks/useWindowDimensions";

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
  const {height, width} = useWindowDimensions();
  
  return (
    <Wrapper activeAndNotHidden={scrollDirection == "down"}>
      <TopBar>
        <Stack alignment="center" distribution={width <= 768 ? "fillEvenly": "equalSpacing"}>
          <Stack.Item>
            {width <= 768 ? <img src={LogoIcon} alt="logo" style={{ height: "60px" }} />: <img src={Logo} alt="logo" style={{ height: "60px" }} />}
          </Stack.Item>
          <Stack alignment="center">
            <Stack.Item>
              <Button url="about" plain monochrome removeUnderline>
                About
              </Button>
            </Stack.Item>
            <Stack.Item>
              <Button primary onClick={() => setActive(!active)}>
                Sign Up
              </Button>
            </Stack.Item>
          </Stack>
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
