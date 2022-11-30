import styled from "styled-components";

const LandingPage = () => {
  return (
    <div>
      <h1>
        Find the park that suits you. <StyledSpan>And them.</StyledSpan>
      </h1>
      <StyledImgContainer>
        <StyledImg src="https://res.cloudinary.com/drve0nkv3/image/upload/v1669298085/samples/landscapes/nature-mountains.jpg" />
      </StyledImgContainer>
    </div>
  );
};

const StyledImgContainer = styled.div`
  overflow: hidden;
  border-radius: 100px 100px 0 0;
  max-width: min-content;
  margin: 2em;
`;

const StyledImg = styled.img`
  height: 80vh;
`;

const StyledSpan = styled.span`
  color: var(--color-yellow);
  display: block;
`;
export default LandingPage;
