import { useEffect, useState } from "react";

const Comment = ({ comment }) => {
  return (
    <>
      <div>
        {/* <h3>{author.first_name}</h3> */}
        <p>{comment.comment}</p>
      </div>
    </>
  );
  // }
};

export default Comment;
