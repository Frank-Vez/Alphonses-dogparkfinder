import { useState, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserForm = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (!isLoading && isAuthenticated && user) {
    return (
      <div>
        <form>
          <h2>enter your infos here:</h2>
        </form>
      </div>
    );
  }
};

export default UserForm;
