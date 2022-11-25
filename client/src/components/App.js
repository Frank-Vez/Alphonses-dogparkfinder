import GlobalStyle from "../styles/GlobalStyle";
import Header from "./Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProfile from "./UserProfile";
import { useAuth0 } from "@auth0/auth0-react";
import MustBeLoggedIn from "./MustBeLoggedIn";

const App = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <BrowserRouter>
      <div>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<div>landing page</div>} />
          <Route path="/about" element={<div>about us page</div>} />
          <Route path="/logIn" element={<div>the log in page</div>} />
          <Route
            path="/home"
            element={
              isAuthenticated ? (
                <div>where you go after loggin in</div>
              ) : (
                <MustBeLoggedIn />
              )
            }
          />
          <Route path="/user" element={<UserProfile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
