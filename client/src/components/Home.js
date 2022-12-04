import { UserContext } from "./UserContext";
import { useContext } from "react";
import styled from "styled-components";
import ParkSuggestions from "./ParkSuggestions";
import FavoritePark from "./FavoritePark";

const Home = () => {
  console.log("mounting the home component");
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
