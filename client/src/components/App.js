import GlobalStyle from "../styles/GlobalStyle";
import Header from "./Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfile from "./UserProfile";
import { useAuth0 } from "@auth0/auth0-react";
import MustBeLoggedIn from "./MustBeLoggedIn";
import LandingPage from "./LandingPage";

const App = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <BrowserRouter>
      <div>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<div>about us page</div>} />
          <Route path="/logIn" element={<div>the log in page</div>} />
          <Route
            path="/home"
            element={isAuthenticated ? <LandingPage /> : <MustBeLoggedIn />}
          />
          <Route path="/user" element={<UserProfile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
