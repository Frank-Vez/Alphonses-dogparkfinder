//import the utils I need from react
import { useState, useContext } from "react";
//Import the context from my provider
import { UserContext } from "./UserContext";

//This component handles to input to add a comment and the submit function
//it needs the current Park._id as well as the commentsRerender state as props
const AddComment = ({ parkId, setCommentsRerender, commentsRerender }) => {
  //state to recieve the comment value
  const [content, setContent] = useState();
  //importing the currentUser from context to send in fetch later
  const { currentUser } = useContext(UserContext);

  //This function Calls a Patch API sending the current user _id and the comment.
  //If the response is positive, status:200, it triggers the rerender of the comments
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
  //this functions sets the content of the state with the value of the input
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
