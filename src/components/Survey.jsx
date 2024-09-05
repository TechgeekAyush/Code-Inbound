import React, { useState, useEffect } from 'react';
import Welcome from './Welcome';
import Question from './Question';

const Survey = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [sessionId, setSessionId] = useState('');
  const [started, setStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const id = Date.now().toString();
    setSessionId(id);
  }, []);

  const questions = [
    { id: 1, text: 'How satisfied are you with our products?', type: 'rating', scale: 5 },
    { id: 2, text: 'How fair are the prices compared to similar retailers?', type: 'rating', scale: 5 },
    { id: 3, text: 'How satisfied are you with the value for money of your purchase?', type: 'rating', scale: 5 },
    { id: 4, text: 'On a scale of 1-10, how would you recommend us to your friends and family?', type: 'rating', scale: 10 },
    { id: 5, text: 'What could we do to improve our service?', type: 'text' }
  ];

  const handleAnswer = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowConfirmation(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    const surveyData = { sessionId, answers, status: 'COMPLETED' };
    localStorage.setItem(sessionId, JSON.stringify(surveyData));
    setCompleted(true);

    setTimeout(() => {
      setCurrentQuestionIndex(0);
      setAnswers({});
      setStarted(false);
      setCompleted(false);
    }, 5000);
  };

  const handleStart = () => {
    setStarted(true);
  };

  const handleConfirmSubmit = () => {
    setShowConfirmation(false);
    handleSubmit();
  };

  const handleCancelSubmit = () => {
    setShowConfirmation(false);
  };

  if (!started) {
    return <Welcome onStart={handleStart} />;
  }

  if (completed) {
    return (
      <div className="thank-you-screen">
        <p>Thank you for your time!</p>
        <p>Redirecting to the welcome screen...</p>
      </div>
    );
  }

  return (
    <div>
      <Question
        question={questions[currentQuestionIndex]}
        answer={answers[questions[currentQuestionIndex].id]}
        onAnswer={handleAnswer}
        onPrev={handlePrev}
        onNext={handleNext}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
      />
      {showConfirmation && (
        <div className="container">
          <p>Are you sure you want to submit the survey?</p>
          <button className='next-button' onClick={handleConfirmSubmit}>Yes</button>
          <button className='prev-button' onClick={handleCancelSubmit}>No</button>
        </div>
      )}
    </div>
  );
};

export default Survey;
