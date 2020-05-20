import React, { useState } from "react";
import { Comment } from "./";
const CommentContainer = (props) => {
  const [show, setShow] = useState(props.data.children.map(() => true));
  return (
    <>
      {props.data.children.map((comment, i) => {
        return (
          <div key={i} style={props.style}>
            <Comment
              data={props.data}
              i={i}
              setShow={(show) => {
                setShow([...show]);
              }}
              show={show}
            >
              {comment.text}
            </Comment>

            {comment.children &&
              show[i] &&
              comment.children.map((cmt, i) => (
                <CommentContainer
                  style={{ marginLeft: 50 }}
                  key={i}
                  data={cmt}
                />
              ))}
          </div>
        );
      })}
    </>
  );
};

export default CommentContainer;
