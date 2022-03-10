import React from "react";
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import styled from "styled-components";

import {
    Layout,
    Stack,
    DisplayText,
    TextContainer,
    Page,
} from "@shopify/polaris";
import Topbar from "../../components/topbar";
import Footer from "../../components/footer";

import aditya from '../../assets/people/aditya.png';
import rohail from '../../assets/people/rohail.jpg';
import matt from '../../assets/people/matt.jpg';
import dan from '../../assets/people/dan.jpg';
import kai from '../../assets/people/kai.jpg';
import greg from '../../assets/people/greg.jpg';
import ravi from '../../assets/people/ravi.png';


const TopBarWrapper = styled.div`
  position: fixed;
  width: 100%;
  z-index: 100
`;

const Container = styled.div`
margin-top: 10vh;
@media only screen and (max-width: 768px){
  margin-top: 20vh;
  padding: 1vw;
  text-align: center;
  width: 100%;
  align: center;
}
`

function Person({img, name}: {img: string, name: string}) {
    return (
      <figure style={{display: "flex", flexDirection:"column", alignItems:"center"}}>
        <img src={img} alt={name} style={{width: "200px", objectFit:"cover"}} />
        <figcaption>{name}</figcaption>
      </figure>
    )
}


function About() {
  return (
    <Layout sectioned={true}>
        <TopBarWrapper>
            <Topbar />
        </TopBarWrapper>
        <Page>
          <Stack alignment="center" vertical>
            <Container>
              <TextContainer>
                <DisplayText>
                  Motivation
                </DisplayText>
                <DisplayText size="small">
                  With the adoption of Internet of Things (IoT) devices continuously increasing, so are the number of attacks. This puts safety critical systems and user information at risk. <br />
                  Therefore, it is increasingly important that companies seek solutions to secure their devices. Many companies want to prioritize developing features that impact their customers. That puts the security of their devices second, which is where Soteria comes in by offering a solution as a service.
                </DisplayText>
              </TextContainer>
            </Container>
          </Stack>
          <VerticalTimeline>
              <VerticalTimelineElement
                contentStyle={{ marginTop: "10vh", background: 'rgba(95, 92, 238, 1)', color: '#fff' }}
                contentArrowStyle={{ borderRight: '7px solid  rgba(95, 92, 238, 1)' }}
                iconStyle={{ background: 'rgba(95, 92, 238, 1)', color: '#fff' }}
              >
                <p>May 2021</p>
                <p>A group of six undergraduate computer engineering students at the University of Waterloo began brainstorming ideas for their fourth year design project. The chosen idea was an IoT fleet management platform focused on device security, Soteria.
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                iconStyle={{ background: 'rgba(95, 92, 238, 1)', color: '#fff' }}
              >
                <p>June 2021</p>
                <p>Details of the platform are finalized.
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                contentStyle={{ background: 'rgba(95, 92, 238, 1)', color: '#fff' }}
                contentArrowStyle={{ borderRight: '7px solid  rgba(95, 92, 238, 1)' }}
                iconStyle={{ background: 'rgba(95, 92, 238, 1)', color: '#fff' }}
              >
                <p>July 2021</p>
                <p>Feasibility analysis and architectural design is completed.
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                iconStyle={{ background: 'rgba(95, 92, 238, 1)', color: '#fff' }}
              >
                <p>October 2021</p>
                <p>Refinement of design and development of the platform starts.
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                contentStyle={{ background: 'rgba(95, 92, 238, 1)', color: '#fff' }}
                contentArrowStyle={{ borderRight: '7px solid  rgba(95, 92, 238, 1)' }}
                iconStyle={{ background: 'rgba(95, 92, 238, 1)', color: '#fff' }}
              >
                <p>July 2021</p>
                <p>Feasibility analysis and architectural design is completed.
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                iconStyle={{ background: 'rgba(95, 92, 238, 1)', color: '#fff' }}
              >
                <p>March 2022</p>
                <p>Prototype completed and presented at the 2022 University of Waterloo FYDP Symposium.
                </p>
              </VerticalTimelineElement>
              <VerticalTimelineElement
                contentStyle={{ background: 'rgba(95, 92, 238, 1)', color: '#fff' }}
                contentArrowStyle={{ borderRight: '7px solid  rgba(95, 92, 238, 1)' }}
                iconStyle={{ background: 'rgba(95, 92, 238, 1)', color: '#fff' }}
              >
                <p>Future</p>
                <p>In the writing...
                </p>
              </VerticalTimelineElement>

          </VerticalTimeline>
          <Stack alignment="center" wrap={false} spacing="extraTight">
            <Container>
              <DisplayText>
                Meet the team
              </DisplayText>
              <Stack alignment="center" distribution="center">
                <Person img={aditya} name="Aditya Arora"/>
                <Person img={greg} name="Gregory Ho"/>
                <Person img={rohail} name="Rohail Kabani"/>
              </Stack>
              <Stack alignment="center" distribution="center">
                <Person img={matt} name="Matt Bonnell"/>
                <Person img={kai} name="Kai Huang"/>
                <Person img={dan} name="Daniel McCormick"/>
              </Stack>
              <Stack vertical alignment="center" distribution="center">
                <DisplayText>
                  Under the guidance of
                </DisplayText>
                <Person img={ravi} name="Prof. Ravi Mazumdar"/>
              </Stack>
            </Container>
          </Stack>

        </Page>
        
        
        <Footer />
    </Layout>
  );
}

export default About;
