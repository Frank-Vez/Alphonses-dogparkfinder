import AddComment from "./AddComment";
import Comment from "./Comment";
import { useEffect, useState } from "react";

const CommentsSection = ({
  comments,
  parkId,
  setCommentsRerender,
  commentsRerender,
}) => {
  const [author, setAuthor] = useState();

  return (
    <div>
      {comments ? (
        <ul>
          {comments.map((comment) => {
            return (
              <li>
                <Comment
                  comment={comment}
                  setCommentsRerender={setCommentsRerender}
                  commentsRerender={commentsRerender}
                />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>There are no comments about this park yet, leave one!</p>
      )}

      <section>
        <AddComment
          parkId={parkId}
          setCommentsRerender={setCommentsRerender}
          commentsRerender={commentsRerender}
        />
      </section>
    </div>
  );
};

export default CommentsSection;
