import React from "react";

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
          <a
            href={`https://news.ycombinator.com/item?id=${props.story.objectID}`}
          >
            <span>{props.story.title}</span>
          </a>
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
            <a
              href={`https://news.ycombinator.com/item?id=${props.story.objectID}`}
            >{`${props.story.points} points`}</a>
          </span>
          ,<span className="Story_separator">|</span>
          <span>
            <a
              href={`https://news.ycombinator.com/user?id=${props.story.author}`}
            >
              <span>{props.story.author}</span>
            </a>
          </span>
          <span className="Story_separator">|</span>
          <span>
            <a
              href={`https://news.ycombinator.com/item?id=${props.story.objectID}`}
            >
              17 hours ago
            </a>
          </span>
          <span className="Story_separator">|</span>
          <span>
            <a
              href={`https://news.ycombinator.com/item?id=${props.story.objectID}`}
            >{`${props.story.num_comments} comments`}</a>
          </span>
          {story_comment_arr.length > 1 ? (
            <div className="story_comment">
              <span>
                {story_comment_arr[0] || null}
                {story_comment_arr.map((comment, i) => {
                  if (i !== 0) {
                    return <p key={i}>{comment}</p>;
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
