import { useState, useContext } from "react";
import { UserContext } from "./UserContext";

const AddComment = ({ parkId }) => {
  const [content, setContent] = useState();
  const { currentUser } = useContext(UserContext);

  console.log(currentUser);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/API/parks/${parkId}/comment`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: currentUser._id,
        comment: content,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  const handleOnChange = (e) => {
    setContent(e.target.value);
  };
  return (
    <form>
      <input
        type={"textArea"}
        placeholder="What do you think about this park?"
        name="newComment"
        onChange={(e) => {
          handleOnChange(e);
        }}
      />
      <button onClick={(e) => handleSubmit(e)}>Submit</button>
    </form>
  );
};

export default AddComment;
