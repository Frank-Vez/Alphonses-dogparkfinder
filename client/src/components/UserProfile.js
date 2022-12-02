import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useState } from "react";

import Modal from "react-modal";
import styled from "styled-components";
import UserForm from "./UserForm";
import DogCard from "./DogCard";
import DogForm from "./DogForm";

import { UserContext } from "./UserContext";

const UserProfile = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { currentUser, userDogs, mustCreateProfile } = useContext(UserContext);

  console.log(isAuthenticated);
  console.log(currentUser);
  console.log(mustCreateProfile);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modifyModalIsOpen, , setModifyModalIsOpen] = useState(false);
  //when the user goes to profile page, checks if the the user has a
  //profile in our DB. if he has one, sets the profile to the current user
  //if he doesnt, redirect him to the form to add his infos.

  const handleToAdd = () => {
    setModalIsOpen(true);
  };

  const handleToModify = () => {
    setModifyModalIsOpen(true);
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }
  //redirect the user to the form if he doesnt have a profile yet
  if (isAuthenticated && mustCreateProfile) {
    return <UserForm />;
  }
  //if the user has a profile: renders his infos
  if (isAuthenticated && currentUser.email)
    return (
      <Wrapper>
        <StyledSection>
          <h1>Your profile</h1>
          <div>
            <h2>{currentUser.first_name}</h2>
            <p>{currentUser.email}</p>
          </div>
        </StyledSection>

        {/* renders the users dogs */}
        {!userDogs ? null : (
          <StyledDogSection>
            <button onClick={handleToAdd}>Add a dog</button>
            <StyledDogContainer>
              {userDogs.map((dog) => {
                return <DogCard dog={dog} currentUser={currentUser} />;
              })}
            </StyledDogContainer>
            <Modal isOpen={modalIsOpen}>
              <DogForm
                setModalIsOpen={setModalIsOpen}
                userId={currentUser._id}
              />
            </Modal>
          </StyledDogSection>
        )}
      </Wrapper>
    );
};

const StyledDogContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledDogSection = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const StyledSection = styled.section`
  margin: 2em;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledData = styled.div``;

export default UserProfile;
