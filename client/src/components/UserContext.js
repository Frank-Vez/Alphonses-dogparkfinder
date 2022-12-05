import { createContext, useState, useEffect } from "react";
import usePersistedState from "./hooks/usePersistedState";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext(null);

//this provider sets the user info for the whole website.
//it is updated eachtime the rerender is called.

export const UserProvider = ({ children }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [currentUser, setCurrentUser] = usePersistedState(
    {
      first_name: "",
      last_name: "",
      email: "",
      position: {},
      dogs: [],
      hasAFavorite: false,
      favoritePark: [],
    },
    "current-user"
  );
  const [mustCreateProfile, setMustCreateProfile] = usePersistedState(
    false,
    "mustCreateProfile"
  );
  const [userDogs, setUserDogs] = usePersistedState([], "user-dogs");
  const [rerenderUser, setRerenderUser] = useState(false);

  useEffect(() => {
    const getAlltheInfos = async () => {
      if (isAuthenticated && user) {
        console.log("fetchin current user by email");
        const rawProfile = await fetch(`/API/currentUser/${user.email}`);
        const jsonProfile = await rawProfile.json();
        console.log(jsonProfile);
        if (jsonProfile.status === 200 || jsonProfile.status === 304) {
          if (jsonProfile.user.email === user.email) {
            setCurrentUser({ ...currentUser, ...jsonProfile.user });
            setUserDogs(jsonProfile.dogs);
            setMustCreateProfile(false);
          }
        }
        if (jsonProfile.status === 206) {
          console.log(jsonProfile);
          setMustCreateProfile(jsonProfile.mustCreateProfile);
        } else {
          console.log(jsonProfile);
        }
      }
    };
    getAlltheInfos();
  }, [isAuthenticated, rerenderUser]);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        mustCreateProfile,
        setMustCreateProfile,
        userDogs,
        setUserDogs,
        rerenderUser,
        setRerenderUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
