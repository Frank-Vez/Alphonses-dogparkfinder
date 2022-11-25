import { createContext } from "react";
import usePersistedState from "./hooks/usePersistedState";
import { useAuth0 } from "@auth0/auth0-react";

export const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = usePersistedState({
    first_name: "",
    last_name: "",
    email: "",
    position: {},
    dogs: [],
    hasFavorite: false,
  });

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};
