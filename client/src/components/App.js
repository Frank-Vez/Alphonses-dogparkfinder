//imports the functions needed from react and auth0
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";

//import the needed components
import GlobalStyle from "../styles/GlobalStyle";
import Header from "./Header";
import UserProfile from "./UserProfile";
import LandingPage from "./LandingPage";
import DogForm from "./DogForm";
import Home from "./Home";
import ParkDetails from "./ParkDetails";
import ExploreParks from "./ExploreParks";
import ProposeAPark from "./ProposeAPark";
import AboutUs from "./AboutUs";

//the App component sets the page for the website and the routes for each components
const App = () => {
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
