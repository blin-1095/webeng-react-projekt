import React from 'react';

import {
  f7,
  f7ready,
  App,
  Panel,
  View,
  Page,
  Navbar,
  Block,

} from 'framework7-react';


import routes from '../js/routes';

const MyApp = () => {
  // Login screen demo data


  // Framework7 Parameters
  const f7params = {
    name: 'Map\'edia', // App name
    theme: 'auto', // Automatic theme detection
    /*serviceWorker: {
      path: '../service-worker.js',
      scope: '/',
    },*/

    // App routes
    routes: routes,

  };

  f7ready(() => {


    // Call F7 APIs here
  });

  return (
    <App {...f7params} >

      {/* Your main view, should have "view-main" class */}
      <View main className="safe-areas" url="/" />

    </App>
  )
}
export default MyApp;