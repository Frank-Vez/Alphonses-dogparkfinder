import AddComment from "./AddComment";
import Comment from "./Comment";
import { useState } from "react";
import styled from "styled-components";

const CommentsSection = ({
  comments,
  parkId,
  setCommentsRerender,
  commentsRerender,
}) => {
  return (
    <div>
      {comments ? (
        <StyledUl>
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
        </StyledUl>
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

const StyledUl = styled.ul`
  max-height: 200px;
  width: 50%;
  overflow: scroll;
`;

export default CommentsSection;
