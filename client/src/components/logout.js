import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { UserContext } from "./UserContext";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const { setCurrentUser } = useContext(UserContext);

  return (
    <button
      onClick={() => {
        setCurrentUser({
          first_name: "",
          last_name: "",
          email: "",
          position: {},
          dogs: [],
          hasAFavorite: false,
          favoritePark: [],
        });
        logout({
          returnTo: window.location.origin,
        });
      }}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
