import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { Auth0Provider } from "@auth0/auth0-react";

// once you sign up for an Auth0 account, they will provide you with the domain and clientId
ReactDOM.render(
  <Auth0Provider
    domain={process.env.REACT_APP_AUTH_DOMAIN}
    clientId={process.env.REACT_APP_AUTH_CLIENT_ID}
    redirectUri={process.env.REACT_APP_AUTH_REDIRECT_URI}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);

