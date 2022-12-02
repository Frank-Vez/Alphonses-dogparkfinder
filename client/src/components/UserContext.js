import { createContext, useState } from "react";
import usePersistedState from "./hooks/usePersistedState";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = usePersistedState(
    {
      first_name: "",
      last_name: "",
      email: "",
      position: {},
      dogs: [],
      hasFavorite: false,
      favoritePark: [],
    },
    "current-user"
  );
  const [mustCreateProfile, setMustCreateProfile] = usePersistedState(
    false,
    "mustCreateProfile"
  );
  const [userDogs, setUserDogs] = usePersistedState([], "user-dogs");

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        mustCreateProfile,
        setMustCreateProfile,
        userDogs,
        setUserDogs,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
