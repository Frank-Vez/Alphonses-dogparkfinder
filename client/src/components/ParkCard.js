import styled from "styled-components";
import { useNavigate } from "react-router";

const ParkCard = ({ park }) => {
  const navigate = useNavigate();

  const handleToDetails = (e) => {
    e.preventDefault();
    navigate(`/parks/${park._id}`);
  };
  return (
    <Wrapper onClick={(e) => handleToDetails(e)}>
      <img src={park.mainPicture} alt=" dogpark representation" />
      <InfosContainer>
        <h2>{park.name}</h2>
        <h3>{park.position.address}</h3>
        <p>
          {park.amenities.map((amenity, i) => {
            // shows the park amenities, ends the sentence with a dot
            if (park.amenities.indexOf(amenity) === park.amenities.length - 1) {
              return `${amenity}` + ".";
            }
            return `${amenity}` + " , ";
          })}
        </p>
      </InfosContainer>
    </Wrapper>
  );
};

const InfosContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.a`
  border: solid 3px var(--color-border);
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-width: 350px;
  min-height: 400px;
  margin: 10px;
  background-color: white;
`;

export default ParkCard;
