import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useContext } from "react";
import GlobalStyle from "../styles/GlobalStyle";
import Header from "./Header";
import UserProfile from "./UserProfile";
import MustBeLoggedIn from "./MustBeLoggedIn";
import LandingPage from "./LandingPage";
import DogForm from "./DogForm";
import Home from "./Home";
import { ParkContext } from "./ParkContext";
import { UserContext } from "./UserContext";
import ParkDetails from "./ParkDetails";
import styled from "styled-components";
import ExploreParks from "./ExploreParks";
import ProposeAPark from "./ProposeAPark";
import AboutUs from "./AboutUs";

const App = () => {
  const { isAuthenticated, user } = useAuth0();
  const { parks, setParks } = useContext(ParkContext);
  const {
    currentUser,
    setCurrentUser,
    setUserDogs,
    setMustCreateProfile,
    userDogs,
  } = useContext(UserContext);

  return (
    <BrowserRouter>
      <StyledApp>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/logIn" element={<div>the log in page</div>} />
          <Route path="/user" end element={<UserProfile />} />
          <Route path="/user/:userId/addDog" element={<DogForm />} />
          <Route path="/proposeAPark" element={<ProposeAPark />} />
          <Route path="/parks" element={<ExploreParks />} />
          <Route path="/parks/:parkId" element={<ParkDetails />} />
        </Routes>
      </StyledApp>
    </BrowserRouter>
  );
};

const StyledApp = styled.div`
  min-height: 100vh;
  border: solid 1px red;
`;

export default App;
