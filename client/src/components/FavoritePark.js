import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import styled from "styled-components";

const FavoritePark = () => {
  const navigate = useNavigate();
  const [favPark, setFavPark] = useState();
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (!favPark && currentUser.hasAFavorite) {
      console.log("fetching a fucking park details");
      fetch(`/API/parks/${currentUser.favoritePark[0]}/noDetails`)
        .then((res) => res.json())
        .then((data) => {
          if (data.status === 200) {
            console.log(data);
            setFavPark(data.park);
          }
          if (data.status === 304) {
            console.log(data);
          } else {
            console.log(data);
          }
        });
    }
  }, [favPark, currentUser]);

  const handleToParks = () => {
    navigate("/parks");
  };

  return (
    <StyledInfos>
      {currentUser.hasAFavorite && favPark ? (
        <div>
          <div>
            <h2>Your favorite park is</h2>
            <h3>{favPark.name}</h3>
            <p>located at {favPark.position.address}</p>
            <ParkImg src={favPark.mainPicture} alt="park with dogs" />
          </div>
        </div>
      ) : (
        <div>
          <h2>You don't have a favorite park yet</h2>
          <p>Explore the parks to set your favorite park</p>
          <button onClick={() => handleToParks()}>See all the parks</button>
        </div>
      )}
    </StyledInfos>
  );
};

const StyledInfos = styled.div`
  flex: 1 1 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 20px 17px 17px 5px rgba(0, 0, 0, 0.1),
    -32px 21px 15px -3px rgba(0, 0, 0, 0.1);
  margin: 10px;
`;

const ParkImg = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50%;
`;

export default FavoritePark;
