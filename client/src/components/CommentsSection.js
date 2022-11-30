import AddComment from "./AddComment";
import Comment from "./Comment";
import { useState } from "react";

const CommentsSection = ({ comments, parkId }) => {
  const [author, setAuthor] = useState();

  return (
    <div>
      <ul>
        {comments.map((comment) => {
          return (
            <li>
              <Comment comment={comment} />
            </li>
          );
        })}
      </ul>
      <section>
        <AddComment parkId={parkId} />
      </section>
    </div>
  );
};

export default CommentsSection;
