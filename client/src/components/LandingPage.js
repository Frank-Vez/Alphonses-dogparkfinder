import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";

const LandingPage = () => {
  const { isLoading, isAuthenticated } = useAuth0();

  return (
    <LandingPageContainer>
      <h1>
        FIND THE PARK THAT SUITS YOU. <StyledSpan>AND THEM.</StyledSpan>
      </h1>
      {!isAuthenticated ? (
        <h2>You must log in to enjoy the whole website!</h2>
      ) : null}

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
  text-decoration: underline 4px var(--color-main-green);
`;
export default LandingPage;
