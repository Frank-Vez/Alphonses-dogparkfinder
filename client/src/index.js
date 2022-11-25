import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import { Auth0Provider } from "@auth0/auth0-react";
import { UserProvider } from "./components/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-63al4rlon5s78bvs.us.auth0.com"
      clientId="8wULfsC6GNWc8TFAwUUnqKw9WmlQI9Dn"
      redirectUri="http://localhost:3000/home"
    >
      <UserProvider>
        <App />
      </UserProvider>
    </Auth0Provider>
  </React.StrictMode>
);
