import React from 'react';

const Clue = props => (
  <div>
    <p>Question: {props.question}</p>
    <p>Category Name: {props.categoryName}</p>
    <p>Value: ${props.value}</p>
  </div>
);

export default Clue;
