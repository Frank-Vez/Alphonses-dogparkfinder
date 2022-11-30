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

const App = () => {
  const { isAuthenticated, user } = useAuth0();
  const { parks, setParks } = useContext(ParkContext);
  const { currentUser, setCurrentUser, setUserDogs, setMustCreateProfile } =
    useContext(UserContext);

  useEffect(() => {
    console.log("ha shit...");
    const getAlltheInfos = async () => {
      const allParks = await fetch("/API/getAllParks");
      const allParksJson = await allParks.json();
      if (isAuthenticated && user) {
        const rawProfile = await fetch(`/API/currentUser/${user.email}`);
        const jsonProfile = await rawProfile.json();
        console.log(jsonProfile);
        if ((jsonProfile.user.email = user.email)) {
          setCurrentUser({ ...currentUser, ...jsonProfile.user });
          setUserDogs(jsonProfile.dogs);
        } else {
          setMustCreateProfile(jsonProfile.mustCreateProfile);
        }
      }
      console.log(allParksJson);
      if (allParksJson.message.length) {
        setParks(allParksJson.message);
      }
    };
    getAlltheInfos();
  }, [isAuthenticated]);

  console.log(parks);

  return (
    <BrowserRouter>
      <StyledApp>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <LandingPage />}
          />
          <Route path="/about" element={<div>about us page</div>} />
          <Route path="/logIn" element={<div>the log in page</div>} />
          <Route path="/user" end element={<UserProfile />} />
          <Route path="/user/:userId/addDog" element={<DogForm />} />
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
