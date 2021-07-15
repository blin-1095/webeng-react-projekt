import React from 'react';

import {
  Page,
  Navbar,
  NavLeft,
  NavTitle,
  Link,
  Toolbar,
} from 'framework7-react';
import logo1 from '/src/images/logo1.png'
import mapedia from '/src/images/Mapedia.svg'

import MapObj from '../js/map';

const HomePage = () => (
  <Page name="home">
    {/* Top Navbar */}
    <Navbar small sliding={false}>
      <NavLeft>
        <img src="images/Mapedia.svg" />
      </NavLeft>
      <NavTitle sliding>Map'edia</NavTitle>

    </Navbar>
    {/* Toolbar */}
    <Toolbar bottom>
      <Link href="/about/">About</Link>
      {/*<Link href="/form/">Form</Link> */}
    </Toolbar>
    {/* Page content */}
    <MapObj />

  </Page>
);
export default HomePage;
