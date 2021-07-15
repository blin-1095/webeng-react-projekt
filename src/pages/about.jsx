import React from 'react';
import { Page, Navbar, Block, BlockTitle, Col, Row } from 'framework7-react';
import { width } from 'dom7';
import { testimage } from '/src/images/testimage.png'
import { alessandra } from '/src/images/alessandra.png'

//TODO add info about the project and the team members (pictures?)
const AboutPage = () => (
  <Page>
    <Navbar title="About" backLink="Back" />
    <BlockTitle>About Map'edia</BlockTitle>
    <Block strong>
      <p>Map’edia is a Progressive Web Application (PWA) which allows you to learn on the go! On our homepage you can see your location presented in real time. When clicking on the location marker you can learn about the location. This is accomplished by pulling up the information from Wikipedia and displaying it to you, the user.</p>
      <p>This PWA was completed in part for the DHBW Ravensburg Campus Friedrichshafen’s Web Engineering 2 course with Professor Friedhelm Koch in 2021.</p>
    </Block>
    <BlockTitle>How the Wiki Works</BlockTitle>
      <Block strong>      
        <p>Our Map'edia function works with a connection between our map service and a Wikipedia API. To choose what to display to you, our program displays which information is most important to that location (city information, historical ties, etc). As this project was done in Germany, we also chose to display the German Wikipedia site. Therefore, if a location in question is not in the German Wikipedia, it will not be displayed. If you are unable to retrieve information on a single click, please try clicking an extra time.</p>
      </Block>
    <BlockTitle>The Map'edia Team</BlockTitle>
    <Block strong>
      <Row>
        <Col>
          <div class="card">
            <div class="card-header">Scrum Co-Master</div>
            <div class="card-content">
              <img src={"images/alessandra.png"} width="100%" class="lazy lazy-fadeIn"></img>
            </div>
            <div class="card-footer">Alessandra Woods</div>
          </div>
        </Col>
        <Col>
          <div class="card">
            <div class="card-header">Scrum Co-Master</div>
            <div class="card-content">
              <img src={"images/testimage.png"} width="100%" class="lazy lazy-fadeIn"></img>
            </div>
            <div class="card-footer">Daniel Zelesnov</div>
          </div>
        </Col>
        </Row>
        <Row>
        <Col>
          <div class="card">
            <div class="card-header">Navigation</div>
            <div class="card-content">
              <img src={"images/testimage.png"} width="100%" class="lazy lazy-fadeIn"></img>
            </div>
            <div class="card-footer">Lukas Zwaller</div>
          </div>
        </Col>
        <Col>
          <div class="card">
            <div class="card-header">Navigation</div>
            <div class="card-content">
              <img src={"images/testimage.png"} width="100%" class="lazy lazy-fadeIn"></img>
            </div>
            <div class="card-footer">Benedikt Doerflein</div>
          </div>
        </Col>
        </Row>
        <Row>
        <Col>
          <div class="card">
            <div class="card-header">Wiki-Expert</div>
            <div class="card-content">
              <img src={"images/testimage.png"} width="50%" class="lazy lazy-fadeIn"></img>
            </div>
            <div class="card-footer">Pascal Wildermuth</div>
          </div>
        </Col>

      </Row>
    </Block>
  </Page>
);

export default AboutPage;
