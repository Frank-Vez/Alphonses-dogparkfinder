import styled from "styled-components";
import { GiBalloonDog } from "react-icons/gi";
import { useNavigate, NavLink } from "react-router-dom";
import LoginButton from "./login";
import LogoutButton from "./logout";
import { useAuth0 } from "@auth0/auth0-react";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };

  const handleToUser = () => {
    navigate("/user");
  };

  return (
    <StyledHeader>
      <div>
        <a onClick={handleHome}>
          <GiBalloonDog size={77} color={"var(--color-secondary-blue)"} />
        </a>
        <StyledLogo onClick={handleHome}>Alphonse's</StyledLogo>
      </div>
      <StyledNavButtonContainer>
        {isAuthenticated ? (
          <>
            <StyledNavLink to={"/parks"}>Find a park</StyledNavLink>
            <StyledNavLink to={"/proposeAPark"}>Propose a park</StyledNavLink>
          </>
        ) : null}
        <StyledNavLink to={"/about"}>About us</StyledNavLink>
        {!isLoading && !isAuthenticated ? <LoginButton /> : null}
        {!isLoading && isAuthenticated ? <LogoutButton /> : null}
        {isAuthenticated ? (
          <>
            <a onClick={handleToUser}>
              <StyledUser size={40} color={"var(--color-secondary-green)"} />
            </a>
          </>
        ) : null}
      </StyledNavButtonContainer>
    </StyledHeader>
  );
};

const StyledUser = styled(FaUserCircle)`
  margin: 0 5px;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.2, 1.2);
  }
`;

const StyledNavLink = styled(NavLink)`
  margin: 0 10px;
  font-family: var(--font-body);
  font-size: 18px;
  cursor: pointer;
`;

const StyledNavButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const StyledHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px dotted var(--color-secondary-blue);
`;

const StyledLogo = styled.a`
  font-size: 77px;
  color: var(--color-secondary-blue);
  font-family: var(--font-logo);
  cursor: pointer;
  &:hover {
    font-weight: 400;
  }
`;

export default Header;
