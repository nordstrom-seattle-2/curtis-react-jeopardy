import React from 'react';

const unselectedStyle = { color: 'rgba(0, 0, 0, .5)' };
const selectedStyle = { border: '8px inset red' };

const Clue = props => (
  <div style={props.selected ? selectedStyle : unselectedStyle}
       onClick={props.handleClueSelection}>
    <p>Question: {props.question}</p>
    <p>Category Name: {props.categoryName}</p>
    <p>Value: ${props.value}</p>
  </div>
);

export default Clue;
