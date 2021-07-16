import React from 'react';
import {
  Page,
  Navbar,
  NavTitle,
  Link,
  Toolbar,
} from 'framework7-react';

const HomePage = () => (
  <Page name="home">
    {/* Top Navbar */}
    <Navbar large>
      <NavTitle>Map'edia</NavTitle>
      <NavTitleLarge>Map'edia</NavTitleLarge>
    </Navbar>
    {/* Toolbar */}
    <Toolbar bottom>
      <Link>Left Link</Link>
      <Link>Right Link</Link>
    </Toolbar>
    {/* Page content */}
    <MapObj />

  </Page>
);
export default HomePage;
