// imports hooks from react
import { useContext, useState, useRef } from "react";
//import functions from fetches
import { deleteComment, modifyComment } from "./utils.js/fetches";

import { BsTrash, BsFillPencilFill } from "react-icons/bs";
import { UserContext } from "./UserContext";

//This component renders each comments on its own. It the user Id of the comment is the same as the currentUserId, you can also modify or delete your comment.
const Comment = ({ comment, commentsRerender, setCommentsRerender }) => {
  //imports the currentuser from the context
  const { currentUser } = useContext(UserContext);
  //declare state to know if the user is modyfying a comment
  const [modify, setModify] = useState(false);
  // declare a useref hook for the comment
  const commentRef = useRef();

  //calls the deletes a comment fetch
  const handleDelete = (e) => {
    e.preventDefault();
    deleteComment(comment.commentId, comment.park);
    setCommentsRerender(!commentsRerender);
    alert("your comment has been deleted! ");
  };
  //toggles modify on or off
  const handleToggleModify = () => {
    setModify(!modify);
  };

  //calls the modify comment fetch, close the modify, rerenders the comments
  const handleSubmitModify = () => {
    if (commentRef.current.value === "") {
      setModify(!modify);
    } else {
      modifyComment(comment.park, comment.commentId, commentRef.current.value);
      setModify(!modify);
      alert("your comment has been modified");
      setCommentsRerender(!commentsRerender);
    }
  };
  return (
    <>
      <div>
        <h3>{comment.author.name}</h3>
        {!modify ? (
          <p>{comment.comment}</p>
        ) : (
          <input type={"text"} placeholder={comment.comment} ref={commentRef} />
        )}

        <p>{comment.time}</p>
        <div>
          {currentUser._id === comment.author.id ? (
            <div>
              <button
                onClick={
                  !modify
                    ? () => handleToggleModify()
                    : () => handleSubmitModify()
                }
              >
                <BsFillPencilFill />
              </button>

              <button onClick={(e) => handleDelete(e)}>
                <BsTrash />
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
  // }
};

export default Comment;
