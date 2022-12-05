import styled from "styled-components";

//this component renders the dogcards
const DogCard = ({ dog }) => {
  return (
    <>
      <div>
        <StyledCard>
          <StyledImgCont>
            <StyledImg src={dog.picture} alt="your dog's photo" />
          </StyledImgCont>

          <div>
            <h2>{dog.name}</h2>
            <h3>{dog.breed}</h3>
            <p>{dog.weight} lbs</p>
            <p>{dog.height} cm</p>
          </div>
        </StyledCard>
        <div></div>
      </div>
    </>
  );
};

const StyledImgCont = styled.div`
  height: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
`;

const StyledImg = styled.img`
  width: 100%;
  max-height: auto;
`;

const StyledCard = styled.div`
  border: 2px solid var(--color-border);
  width: 170px;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 40px;
  margin: 1em;
  overflow: hidden;
  box-shadow: 23px 34px 15px -3px rgba(0, 0, 0, 0.1),
    -25px 10px 15px -3px rgba(0, 0, 0, 0.1);
`;
export default DogCard;
