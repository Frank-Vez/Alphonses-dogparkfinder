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

  console.log(window.location.href);

  useEffect(() => {
    const getAlltheInfos = async () => {
      if (!parks) {
        const allParks = await fetch("/API/getAllParks");
        const allParksJson = await allParks.json();
        if (allParksJson.status === 200) {
          setParks(allParksJson.message);
        } else {
          console.log(allParksJson);
        }
      }
      if (isAuthenticated && user) {
        const rawProfile = await fetch(`/API/currentUser/${user.email}`);
        const jsonProfile = await rawProfile.json();
        console.log(jsonProfile);
        if (jsonProfile.user.email === user.email) {
          setCurrentUser({ ...currentUser, ...jsonProfile.user });
          setUserDogs(jsonProfile.dogs);
        } else {
          setMustCreateProfile(jsonProfile.mustCreateProfile);
        }
      }
    };
    if (window.location.href === "http://localhost:3000/") {
      getAlltheInfos();
    }
  }, [isAuthenticated]);

  //move to homepage

  console.log(currentUser);
  console.log(userDogs);
  console.log(parks);

  return (
    <BrowserRouter>
      <StyledApp>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route
            path="/"
            element={isAuthenticated && parks ? <Home /> : <LandingPage />}
          />
          <Route path="/about" element={<div>about us page</div>} />
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
