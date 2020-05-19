import React from "react";
import { Link } from "react-router-dom";

const Story = (props) => {
  let story_comment = props.story._highlightResult.story_text;
  let story_comment_arr = [];
  if (story_comment) {
    story_comment_arr = story_comment.value.split("<p>");
  }

  if (props.story.title || props.story.comment_text) {
    return (
      <aside className="story">
        <div className="story-title">
          <Link to={`/item/${props.story.objectID}`}>
            <span>{props.story.title}</span>
          </Link>
          {props.story.url ? (
            <a
              href={props.story.url}
              target="_blank"
              className="Story_link"
              rel="noopener noreferrer"
            >
              {`(${props.story.url})`}
            </a>
          ) : null}
        </div>
        <div className="story_meta">
          <span>
            <Link
              to={`/item/${props.story.objectID}`}
            >{`${props.story.points} points`}</Link>
          </span>
          ,<span className="Story_separator">|</span>
          <span>
            <Link to={`/user/${props.story.author}`}>
              <span>{props.story.author}</span>
            </Link>
          </span>
          <span className="Story_separator">|</span>
          <span>
            <Link to={`/item/${props.story.objectID}`}>17 hours ago</Link>
          </span>
          <span className="Story_separator">|</span>
          <span>
            <Link
              to={`/item/${props.story.objectID}`}
            >{`${props.story.num_comments} comments`}</Link>
          </span>
          {story_comment_arr.length > 1 ? (
            <div className="story_comment">
              <span>
                <p
                  style={{ marginTop: 0 }}
                  dangerouslySetInnerHTML={{
                    __html: story_comment_arr[0] || null,
                  }}
                />
                {story_comment_arr.map((comment, i) => {
                  if (i !== 0) {
                    return (
                      <p
                        key={i}
                        dangerouslySetInnerHTML={{ __html: comment }}
                      />
                    );
                  }
                  return null;
                })}
              </span>
            </div>
          ) : null}
        </div>
      </aside>
    );
  } else {
    return null;
  }
};

export default Story;
