import React, { useState, useCallback, useEffect } from "react";

import styled from "styled-components";

import { useLocation } from "react-router-dom";

import {Toaster, toast} from 'react-hot-toast'

import {
    Layout,
    Stack,
    DisplayText,
    TextContainer
} from "@shopify/polaris";
import Topbar from "../../components/topbar";
import Footer from "../../components/footer";

import network from "../../assets/network.mp4";
import vulnImage from "../../assets/vuln.png";
import fleetImage from "../../assets/fleet.png";
import orchImage from "../../assets/orch.png";

const TopBarWrapper = styled.div`
  position: fixed;
  width: 100%;
  z-index: 100;
`;

const BannerVideo = styled.video`
  min-width: 100%;
  min-height: 90vh;
  object-fit: cover;

  .Polaris-Stack {
    width: 80%;
    margin: auto;
  }
  max-width: 98vw;
  @media only screen and (max-width: 768px){
    max-width: auto;
  }
`

const TranslateUp = styled.div`
  .Polaris-Stack {
    position: relative;
    width: 80%;
    transform: translateY(-60vh);
    margin: auto;
    margin-bottom: -20vh;
  }
`

const WhiteText = styled.div`
  color: #fff;
`;

const BannerHeader = styled.h1`
font-size: max(min(5vw, 60px), 72px);
font-weight: 700;
line-height: max(min(5vw, 60px), 72px);;
padding-bottom: max(5vw, 20px);
`

const BannerSubheader = styled.h2`
font-size: max(min(3vw, 30px), 36px);
font-weight: 700;
line-height: max(min(3vw, 30px), 36px);
padding-bottom: 20px
`

const PurpleText = styled.div`
display: block;
color: #6C63FF
`

interface MaxWidthContainerProps {
    readonly maxWidth?: string;
}

const MaxWidthContainer = styled.div<MaxWidthContainerProps>`
max-width: ${props => props.maxWidth ? props.maxWidth: "300px"}
`

interface FeatureStackProps {
    readonly flip?: boolean;
}

const FeatureStack = styled.div<FeatureStackProps>`
margin-top: 100px;
.Polaris-Stack {
    max-width: 820px;
    flex-direction: ${props => props.flip ? "row-reverse": "row"}
}
`

type FeatureProps = {
  flip?: boolean;
  textHeader: string;
  textBody: string;
  image: string;
};

type FeatureTextProps = {
  textHeader: string;
  textBody: string;
};

const FeatureText = ({ textHeader, textBody }: FeatureTextProps) => {
  return (
    <MaxWidthContainer maxWidth="330px">
        <Stack vertical alignment="center" distribution="center" spacing="loose">
            <TextContainer>
                <DisplayText size="extraLarge" element="h1">
                        <PurpleText>{textHeader}</PurpleText>
                </DisplayText>
                <DisplayText size="small">
                    {textBody}
                </DisplayText>
            </TextContainer>
        </Stack>
    </MaxWidthContainer>
  );
};

const FeatureImage = styled.img`
max-width: 400px;
flex-grow: 1;
margin-left: 20px;
`

const Feature = ({ flip, textHeader, textBody, image }: FeatureProps) => {
  return (
    <FeatureStack flip={flip}>
        <Stack alignment="center" distribution="center" spacing="extraLoose">
            <FeatureText textHeader={textHeader} textBody={textBody} />
            <FeatureImage src={image} />
        </Stack>
    </FeatureStack>
  );
};

type LocationState = {
  from: {
    pathname: string;
  };
}


function Frontpage() {
  const location = useLocation();

  useEffect(() => {
    const { from } = location.state as LocationState || { from: { pathname: "" } };
    if(from.pathname !== ""){
      console.log(from.pathname)
      toast.error("You must be logged in to access that page", {
        duration: 5000,
      });
    }
  }, [location.state]);

  return (
      <Layout sectioned={true}>
          <div><Toaster/></div>
          <TopBarWrapper>
              <Topbar />
          </TopBarWrapper>
          <TranslateUp>
            <BannerVideo autoPlay muted loop>
              <source src={network} type="video/mp4" />
            </BannerVideo>
            <Stack alignment="center" distribution="leading">
                <WhiteText>
                    <BannerHeader>See. Know. Secure.</BannerHeader>
                    <BannerSubheader>
                        <MaxWidthContainer maxWidth="600px">
                            Monitor every asset and detect vulnerabilities and threats.
                        </MaxWidthContainer>
                    </BannerSubheader>
                    <BannerSubheader>
                        Seamlessly.
                    </BannerSubheader>
                </WhiteText>
            </Stack>
          </TranslateUp>
          <Layout.Section>
              <Stack vertical alignment="center">
                  <DisplayText size="extraLarge">Our Features</DisplayText>
                  <Feature
                      textBody="Protect your devices by scanning for vulnerabilities regularly and automatically patch them."
                      textHeader="Vulnerability 
                      Scanner"
                      image={vulnImage}
                  ></Feature>
                  <Feature
                      flip
                      textBody="Monitor device utilization and be notified when something is off."
                      textHeader="Fleet Reporting"
                      image={fleetImage}
                  ></Feature>
                  <Feature
                      textBody="Manage your fleet with ease, and automatically patch vulnerabilities when found."
                      textHeader="Orchestration &amp; Automation"
                      image={orchImage}
                  ></Feature>
              </Stack>
          </Layout.Section>
          <Footer />
      </Layout>
  );
}

export default Frontpage;
