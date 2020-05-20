import React from "react";
import { Link } from "react-router-dom";

const Story = (props) => {
  let story_comment = props.story._highlightResult.story_text;
  let story_comment_arr = [];
  if (story_comment) {
    story_comment_arr = story_comment.value.split("<p>");
  }

  const handleTime = (created_at) => {
    var today = new Date();
    const date = new Date(created_at);
    const millisecond = today.getTime() - date.getTime();
    const years = Math.floor(millisecond / 31536000000);
    const months = Math.floor(millisecond / 2592000000);
    const days = Math.floor(millisecond / 86400000);
    const hours = Math.floor(millisecond / 3600000);
    const minutes = Math.floor((millisecond % 3600000) / 60000);
    const seconds = Math.floor((millisecond % 120000) / 1000);

    if (years > 0) {
      return `${years} years ago`;
    } else if (months > 0) {
      return `${months} months ago`;
    } else if (days > 0) {
      return `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} hours ago`;
    } else if (minutes > 0) {
      return `${minutes} minutes ago`;
    } else if (seconds > 0) {
      return `${seconds} seconds ago`;
    }
  };

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
            <Link to={`/item/${props.story.objectID}`}>
              {handleTime(props.story.created_at)}
            </Link>
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
