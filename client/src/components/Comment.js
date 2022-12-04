import { useContext, useEffect, useState, useRef } from "react";
import { BsTrash, BsFillPencilFill } from "react-icons/bs";
import { UserContext } from "./UserContext";
import { deleteComment, modifyComment } from "./utils.js/fetches";

const Comment = ({ comment, commentsRerender, setCommentsRerender }) => {
  const { currentUser } = useContext(UserContext);
  const [author, setAuthor] = useState(null);
  const [modify, setModify] = useState(false);

  const commentRef = useRef();

  // useEffect(() => {
  //   fetch(`/API/users/${comment.author}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.status === 200) {
  //         setAuthor(data.user);
  //       }
  //     });
  // }, [rerender]);

  const handleDelete = (e) => {
    e.preventDefault();
    deleteComment(comment.commentId, comment.park);
    setCommentsRerender(!commentsRerender);
    alert("your comment has been deleted! ");
  };

  const handleToggleModify = () => {
    setModify(!modify);
  };

  const handleSubmitModify = () => {
    modifyComment(comment.park, comment.commentId, commentRef.current.value);
    setModify(!modify);
    alert("your comment has been modified");
    setCommentsRerender(!commentsRerender);
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
