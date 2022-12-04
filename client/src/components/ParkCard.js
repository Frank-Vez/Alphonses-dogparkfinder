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
      <ImgContainer>
        <StyledImg src={park.mainPicture} alt=" dogpark representation" />
      </ImgContainer>
      <InfosContainer>
        <StyledH2>{park.name}</StyledH2>
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

const ImgContainer = styled.div`
  max-height: 40%;
  max-width: 90%;
  overflow: hidden;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const StyledImg = styled.img`
  height: 150%;
  width: auto;
`;

const StyledH2 = styled.h2`
  text-decoration: underline 3px var(--color-secondary-blue);
  text-underline-offset: 10px;
  padding-bottom: 10px;
`;

const InfosContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.a`
  border: solid 3px var(--color-border);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
  max-width: 350px;
  min-height: 400px;
  max-height: 500px;
  margin: 10px;
  background-color: white;
  border-radius: 50px;
`;

export default ParkCard;
