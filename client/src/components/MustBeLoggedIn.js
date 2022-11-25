import LoginButton from "./login";

const MustBeLoggedIn = () => {
  return (
    <div>
      <h1>You must be logged in to explore the website</h1>
      <LoginButton />
    </div>
  );
};

export default MustBeLoggedIn;
