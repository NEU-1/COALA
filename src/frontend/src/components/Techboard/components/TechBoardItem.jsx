import React from 'react';

const TechBoardItem = ({ idx, title, contents, createdBy }) => {
  return (
    <div>
      <h2>{title}</h2>
      <h5>{createdBy}</h5>
      <hr />
      <p>{contents}</p>
    </div>
  );
};

export default TechBoardItem;