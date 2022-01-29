import React, { useState, useCallback, useEffect } from "react";

import styled from "styled-components";

import {
  Frame,
  Page,
  Card,
  ResourceList,
  ResourceItem,
  TextStyle,
  Avatar,
  TextField,
  Filters,
  Button,
  ResourceListSelectedItems,
  Tooltip,
  Stack,
  Heading,
} from "@shopify/polaris";
import Topbar from "../../components/topbar";

import bannerImage from "../../assets/banner.png";
import vulnImage from "../../assets/vuln.png";
import fleetImage from "../../assets/fleet.png";
import orchImage from "../../assets/orch.png";

const TopBarWrapper = styled.div`
  position: fixed;
  width: 100%;
`;

const Banner = styled.div`
  background-image: url(${bannerImage});
  height: 700px;
  background-size: cover;
  display: flex;
  padding-left: 200px;
`;

const BannerTextWrapper = styled.div`
  color: #fff;
  font-weight: 700;
  max-width: 720px;
  padding-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Features = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  color: #3f3d56;
  font-size: 48px;
  font-weight: 700;
  line-height: 64px;
  padding: 30px 0 30px 0;
  padding-bottom: 100px;
`;

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <span
        style={{
          fontSize: "42px",
          lineHeight: "42px",
          color: "#6C63FF",
          marginBottom: "20px",
        }}
      >
        {textHeader}
      </span>
      <span
        style={{
          fontWeight: "normal",
          fontSize: "18px",
          lineHeight: "18px",
          color: "#494949",
        }}
      >
        {textBody}
      </span>
    </div>
  );
};

const FeatureImage = ({ image }: { image: string }) => {
  return <img style={{ maxWidth: "400px" }} src={image} />;
};

const Feature = ({ flip, textHeader, textBody, image }: FeatureProps) => {
  return (
    <div
      style={{
        marginTop: "100px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ maxWidth: "800px", display: "flex" }}>
        <div style={{ flexGrow: 1, marginRight: "20px" }}>
          {flip ? (
            <FeatureImage image={image} />
          ) : (
            <FeatureText textHeader={textHeader} textBody={textBody} />
          )}
        </div>
        <div style={{ flexGrow: 1, marginLeft: "20px" }}>
          {flip ? (
            <FeatureText textHeader={textHeader} textBody={textBody} />
          ) : (
            <FeatureImage image={image} />
          )}
        </div>
      </div>
    </div>
  );
};

function Frontpage() {
  return (
    <div>
      <TopBarWrapper>
        <Topbar />
      </TopBarWrapper>
      <Banner>
        <BannerTextWrapper>
          <div
            style={{
              fontSize: "70px",
              lineHeight: "70px",
              paddingBottom: "50px",
            }}
          >
            See. Know. Secure.
          </div>
          <div
            style={{
              fontSize: "36px",
              lineHeight: "36px",
              paddingBottom: "20px",
            }}
          >
            Monitor every asset and detect vulnerability and threats.
          </div>
          <div
            style={{
              fontSize: "36px",
              lineHeight: "36px",
              paddingBottom: "20px",
            }}
          >
            Seamlessly.
          </div>
        </BannerTextWrapper>
      </Banner>
      <Features>
        Our Features
        <Feature
          textBody="Protect your devices by scanning for vulnerabilities regularly and automatically patch them."
          textHeader="Vulnerability Scanner"
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
          textHeader="Orchestration & Automation"
          image={orchImage}
        ></Feature>
      </Features>
    </div>
  );
}

export default Frontpage;
