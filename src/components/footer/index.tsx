import React, { useState, useCallback, useEffect } from "react";

import styled from "styled-components";

import { Button, Stack } from "@shopify/polaris";
import {Link} from "react-router-dom";

import useWindowDimensions from "../../hooks/useWindowDimensions";

import LoginSignup from "../../components/login-sigup/index";

import Logo from "../../assets/logo-with-name.svg";
import LogoIcon from "../../assets/logo-icon.svg";

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
  const { width} = useWindowDimensions();

  const activator = (
      <Button primary onClick={() => setActive(!active)}>
        Sign Up
      </Button>
  );
  return (
    <Wrapper>
      <FooterDiv>
      <Stack alignment="center" distribution={width <= 768 ? "fillEvenly": "equalSpacing"}>
          <Stack.Item>
            <Link to="/">
              {width <= 768 ? <img src={LogoIcon} alt="logo" style={{ height: "60px" }} />: <img src={Logo} alt="logo" style={{ height: "60px" }} />}
            </Link>
          </Stack.Item>
          <Stack alignment="center">
            <Stack.Item>
              <Button url="/about" plain monochrome removeUnderline>
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
      </FooterDiv>
      <LoginSignup
        active={active}
        setActive={(value: boolean) => setActive(value)}
      />
    </Wrapper>
  );
}

export default Footer;
