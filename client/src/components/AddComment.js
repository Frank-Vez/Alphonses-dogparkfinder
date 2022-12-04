import { useState, useContext } from "react";
import { UserContext } from "./UserContext";

const AddComment = ({ parkId, setCommentsRerender, commentsRerender }) => {
  const [content, setContent] = useState();
  const { currentUser } = useContext(UserContext);

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
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          setContent("");
          setCommentsRerender(!commentsRerender);
        }
      });
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
        value={content}
      />
      <button onClick={(e) => handleSubmit(e)}>Submit</button>
    </form>
  );
};

export default AddComment;
