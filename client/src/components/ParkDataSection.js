import { ImStatsBars } from "react-icons/im";
import styled from "styled-components";

const ParkDataSection = ({ parkData }) => {
  return (
    <StyledSection>
      <ImgContainer>
        <StyledImg src={parkData.mainPicture} alt="park for dogs" />
      </ImgContainer>

      <div>
        <div>
          <StyledTitle>
            <ImStatsBars size={30} />
            <h3>
              This data is taken from all the dogs frequenting the park of a
              regular basis:
            </h3>
          </StyledTitle>

          <div>
            {parkData.averageWeight ? (
              <h3>Average weight: {parkData.averageWeight}</h3>
            ) : null}
            {parkData.averageHeight ? (
              <h3>Average height: {parkData.averageHeight}</h3>
            ) : null}
            {parkData.mostCommonBreeds?.length > 0 ? (
              <StyledOl>
                <h2>Most common breeds:</h2>
                {parkData.mostCommonBreeds.slice(0, 3).map((breed, i) => {
                  return (
                    <StyledLi key={breed[0] + breed[1]}>
                      {+i + 1}. {breed[0]}
                    </StyledLi>
                  );
                })}
              </StyledOl>
            ) : null}
          </div>

          <div>
            <h3>Dogs neutered:</h3> <p>{parkData.neuteredRatio}%</p>
          </div>
        </div>
      </div>
    </StyledSection>
  );
};

const StyledOl = styled.ol`
  margin: 20px 0;
`;

const StyledLi = styled.li`
  font-size: 22px;
`;
const StyledTitle = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const StyledImg = styled.img`
  width: 100%;
  height: auto;
  border-radius: 50px;
`;

const ImgContainer = styled.div`
  flex: 0 0 50%;
`;

const StyledSection = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
`;

export default ParkDataSection;
