import React from 'react';

const Question = ({ question, answer, onAnswer, onPrev, onNext, currentQuestionIndex, totalQuestions }) => {
  const handleRatingClick = (value) => {
    onAnswer(question.id, value);
  };

  return (
    <div className="container">
      <div className="question-header">Customer Survey</div>
      <div className="progress">{currentQuestionIndex + 1}/{totalQuestions}</div>
      <div className="question-text">{question.text}</div>
      {question.type === 'rating' && (
        <div className="rating-container">
          {Array.from({ length: question.scale }, (_, i) => (
            <div
              key={i + 1}
              className={`rating-circle ${answer === i + 1 ? 'selected' : ''}`}
              onClick={() => handleRatingClick(i + 1)}
            >
              {i + 1}
            </div>
          ))}
        </div>
      )}
      {question.type === 'text' && (
        <div className="rating-container">
        <textarea
          value={answer || ''}
          onChange={(e) => onAnswer(question.id, e.target.value)}
        />
        </div>
      )}
      <div className="navigation-buttons">
        <button className="prev-button" onClick={onPrev} disabled={currentQuestionIndex === 0}>
          Prev
        </button>
        {currentQuestionIndex < totalQuestions - 1 ? (
          <button className="next-button" onClick={onNext}>
            Next/Skip
          </button>
        ) : (
          <button className="next-button" onClick={onNext}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Question;
