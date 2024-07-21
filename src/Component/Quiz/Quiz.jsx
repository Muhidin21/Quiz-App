import React, { useState } from 'react';
import '../../index.css';
import './Quiz.css';
import '../../App.css';
import data from './Data.jsx';

const Quiz = () => {
  // State to track the current question index
  const [index, setIndex] = useState(0);
  // State to track the user's score
  const [score, setScore] = useState(0);
  // State to lock the answer selection until the next question is presented
  const [lock, setLock] = useState(false);
  // State to indicate if the quiz is complete
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  // Get the current question from the data array
  const question = data[index];

  // Function to check if the selected answer is correct
  const checkAnswer = (answer) => {
    // Prevent further answer selection if locked
    if (!lock) {
      setLock(true); // Lock further answer selection
      if (answer === question.answer) {
        // Increment score if the answer is correct
        setScore(score + 1);
        // Add 'correct' CSS class to the selected answer
        document.getElementById(answer).classList.add('correct');
      } else {
        // Add 'wrong' CSS class to the selected answer
        document.getElementById(answer).classList.add('wrong');
        // Add 'correct' CSS class to the correct answer
        document.getElementById(question.answer).classList.add('correct');
      }
    }
  };

  // Function to move to the next question
  const nextQuestion = () => {
    setLock(false); // Unlock answer selection
    if (index + 1 < data.length) {
      // Move to the next question if there are more questions
      setIndex(index + 1);
    } else {
      // Mark the quiz as complete if all questions are answered
      setIsQuizComplete(true);
    }
    // Remove 'correct' and 'wrong' CSS classes from all options
    document.querySelectorAll('.option').forEach(option => {
      option.classList.remove('correct');
      option.classList.remove('wrong');
    });
  };

  // Function to reset the quiz to the initial state
  const resetQuiz = () => {
    setIndex(0); // Reset question index
    setScore(0); // Reset score
    setLock(false); // Unlock answer selection
    setIsQuizComplete(false); // Mark quiz as not complete
    // Remove 'correct' and 'wrong' CSS classes from all options
    document.querySelectorAll('.option').forEach(option => {
      option.classList.remove('correct');
      option.classList.remove('wrong');
    });
  };

  return (
    <div className="quiz-container">
      <h1>Somali History Quiz</h1>
      <hr />
      {!isQuizComplete ? (
        <>
          <h2>{question.question}</h2>
          <ul>
            {question.options.map((option, idx) => (
              <li
                key={idx}
                id={option}
                className="option"
                onClick={() => checkAnswer(option)}
              >
                {option}
              </li>
            ))}
          </ul>
          <button onClick={nextQuestion} disabled={!lock}>Next</button>
          <div className="index">
            {index + 1} of {data.length}
          </div>
        </>
      ) : (
        <div className="quiz-complete">
          <h2>Quiz Complete!</h2>
          <p>Your score is {score} out of {data.length}</p>
          <button onClick={resetQuiz}>Reset</button>
        </div>
      )}
    </div>
  );
};

export default Quiz;
