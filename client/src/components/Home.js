//import hooks from react
import { useContext } from "react";
//import components
import { UserContext } from "./UserContext";
import styled from "styled-components";
import ParkSuggestions from "./ParkSuggestions";
import FavoritePark from "./FavoritePark";

const Home = () => {
  //import the current user from context
  const { currentUser } = useContext(UserContext);

  if (currentUser) {
    return (
      <PageBody>
        <ParkSuggestions />
        <FavoritePark />
      </PageBody>
    );
  }
};

const PageBody = styled.div`
  display: flex;
  flex-direction: row;
`;

export default Home;
