import React from "react";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Comment = (props) => {
  return (
    <div className="comment">
      <div className="comment-header">
        <Link to={`/user/${props.data.author}`}>
          <span>{props.data.author || ""}</span>
        </Link>
        <span>{` on ${props.data.created_at}`}</span>
        {props.show[props.i] ? (
          <CaretDownOutlined
            onClick={() => {
              let { show, i, setShow } = props;
              show[i] = !show[i];
              setShow(show);
            }}
          />
        ) : (
          <CaretUpOutlined
            onClick={() => {
              let { show, i, setShow } = props;
              show[i] = !show[i];
              setShow(show);
            }}
          />
        )}{" "}
      </div>
      {props.show[props.i] && (
        <div
          className="comment-text"
          dangerouslySetInnerHTML={{ __html: props.children }}
        />
      )}
    </div>
  );
};

export default Comment;
