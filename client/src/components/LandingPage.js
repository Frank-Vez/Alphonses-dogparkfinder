import styled from "styled-components";

const LandingPage = () => {
  return (
    <LandingPageContainer>
      <h1>
        Find the park that suits you. <StyledSpan>And them.</StyledSpan>
      </h1>
      <StyledImgContainer>
        <StyledImg src="https://res.cloudinary.com/drve0nkv3/image/upload/v1669298085/samples/landscapes/nature-mountains.jpg" />
      </StyledImgContainer>
    </LandingPageContainer>
  );
};

const LandingPageContainer = styled.div`
  margin: 2em;

  h1 {
    margin-bottom: 1rem;
  }
`;

const StyledImgContainer = styled.div`
  overflow: hidden;
  border-radius: 80px;
  max-width: min-content;
`;

const StyledImg = styled.img`
  height: 80vh;
  width: auto;
`;

const StyledSpan = styled.span`
  color: var(--color-yellow);
  display: block;
`;
export default LandingPage;
