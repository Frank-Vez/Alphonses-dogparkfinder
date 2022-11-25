import styled from "styled-components";

const LandingPage = () => {
  return (
    <div>
      <h1>
        Find the park that suits you. <StyledSpan>And them</StyledSpan>
      </h1>
    </div>
  );
};

const StyledSpan = styled.span`
  color: var(--color-yellow);
  display: block;
`;
export default LandingPage;
