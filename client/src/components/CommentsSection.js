import AddComment from "./AddComment";
import Comment from "./Comment";
import { useEffect, useState } from "react";

const CommentsSection = ({ comments, parkId }) => {
  const [author, setAuthor] = useState();

  return (
    <div>
      {comments ? (
        <ul>
          {comments.map((comment) => {
            return (
              <li>
                <Comment comment={comment} />
              </li>
            );
          })}
        </ul>
      ) : (
        <p>There are no comments about this park yet, leave one!</p>
      )}

      <section>
        <AddComment parkId={parkId} />
      </section>
    </div>
  );
};

export default CommentsSection;
