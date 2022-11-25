import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useContext, useState } from "react";
import UserForm from "./UserForm";

import { UserContext } from "./UserContext";

const UserProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [mustCreateProfile, setMustCreateProfile] = useState(false);
  const [userDogs, setUserDogs] = useState([]);
  //when the user goes to profile page, checks if the the user has a
  //profile in our DB. if he has one, sets the profile to the current user
  //if he doesnt, redirect him to the form to add his infos.

  useEffect(() => {
    console.log(user);
    if (isAuthenticated && user) {
      fetch(`/API/currentUser/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if ((data.user.email = user.email)) {
            console.log(data);
            setCurrentUser({ ...data.user });
            setUserDogs(data.dogs);
          } else {
            console.log(data);
            setMustCreateProfile(data.mustCreateProfile);
          }
        });
    }
  }, [isAuthenticated, user]);

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
      <div>
        <h1>Your profile</h1>
        <h2>{currentUser.first_name}</h2>
        <p>{currentUser.email}</p>
        {/* renders the users dogs */}
        {!userDogs ? null : console.log(userDogs)}
      </div>
    );
};

export default UserProfile;
