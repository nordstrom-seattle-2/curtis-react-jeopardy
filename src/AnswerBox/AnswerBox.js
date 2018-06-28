import React from 'react';

const AnswerBox = props => {
  if (!props.visible) {
    return null;
  }
  return (
    <React.Fragment>
      <p>
        <input type="text"
          placeholder="your answer here"
          value={props.submittedAnswer}
          onChange={props.handleAnswerInput} />
      </p>
      <p>
        <button onClick={props.handleAnswerSubmission}
          disabled={props.submittedAnswer.length === 0}>
          Submit answer
        </button>
      </p>
    </React.Fragment>
  );
};

export default AnswerBox;
