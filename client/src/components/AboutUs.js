import styled from "styled-components";

const AboutUs = () => {
  return (
    <BackGroundImg>
      <Wrapper>
        <TextWrapper>
          <StyledTitle>About us</StyledTitle>
          <StyledText>
            Alphonses dog park finder is a project to help owners with difficult
            dogs find the perfect place for their dog to exercise.
          </StyledText>
          <StyledText>
            It is purely user-based so all the infos you find on the website
            comes from the dogs that really frequent the parks.
          </StyledText>
          <StyledText>
            I personnaly have 2 dogs with very different personnalities and can
            definetly enjoy knowing what to expect when I get to a park!{" "}
          </StyledText>
        </TextWrapper>

        <ImgContainer>
          <StyledImg
            src="https://res.cloudinary.com/drve0nkv3/image/upload/v1670128171/ppvvangflxiek45gdwwr.jpg"
            alt="pug atop a mountain looking at the sky"
          />
        </ImgContainer>
      </Wrapper>
    </BackGroundImg>
  );
};

const StyledTitle = styled.h2`
  margin: 20px;
`;

const StyledText = styled.p`
  margin: 20px;
  color: var(--color-secondary-blue);
  font-weight: bold;
`;

const TextWrapper = styled.div`
  width: 50vw;
  margin: 0 3em 3em;
  display: flex;
  flex-direction: column;
`;

const StyledImg = styled.img`
  object-fit: fill;
`;

const ImgContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 3em;
  max-height: 40vh;
  max-width: 40vw;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 35px 35px 0 0;
`;

const Wrapper = styled.div`
  background-color: rgb(237, 217, 71, 0.7);
  height: 100vh;
`;

const BackGroundImg = styled.div`
  background-image: url("https://res.cloudinary.com/drve0nkv3/image/upload/v1669941481/e8l2ytb2zgjarif0lmzy.jpg");
  /* background-repeat: no-repeat; */
  height: 100vh;
`;

export default AboutUs;
