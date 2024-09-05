import React from 'react';

const Welcome = ({ onStart }) => {
  return (
    <div className="container">
      <div className="question-header">Welcome to Our Survey</div>
      <button className="next-button" onClick={onStart}>
        Start
      </button>
    </div>
  );
};

export default Welcome;
