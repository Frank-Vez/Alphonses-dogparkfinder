import { useState, useEffect } from "react";
import styled from "styled-components";

const DogCard = ({ dog, currentUser }) => {
  const [modifyModalIsOpen, setModifyModalIsOpen] = useState(false);

  return (
    <>
      <div>
        <StyledCard>
          <StyledImg src={dog.picture} alt="your dog's photo" />
          <div>
            <h2>{dog.name}</h2>
            <h3>{dog.breed}</h3>
            <p>{dog.weight} lbs</p>
            <p>{dog.height} cm</p>
          </div>
        </StyledCard>
        <div>
          <button>Remove</button>
        </div>
      </div>
    </>
  );
};

const StyledImg = styled.img`
  max-width: 100%;
  height: auto;
  max-height: 120px;
  flex: 1 1 50%;
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
`;
export default DogCard;
