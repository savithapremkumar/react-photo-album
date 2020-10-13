import React from "react";

const Album = (props) => {
  return (
    <div className="album">
      <span className="title">{props.title}</span> |
      <span className="username">{props.username}</span>
    </div>
  );
};
export default Album;
