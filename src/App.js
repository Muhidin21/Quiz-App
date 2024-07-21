import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Auth from './Component/Auth';
import Quiz from './Component/Quiz/Quiz';
import './App.css';

const App = () => {
  const [showStartQuiz, setShowStartQuiz] = useState(false);
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    setShowStartQuiz(true);
    navigate('/quiz');
  };

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Auth showStartQuiz={showStartQuiz} handleStartQuiz={handleStartQuiz} />} />
        <Route path="/quiz" element={<Quiz />} />
      </Routes>
    </div>
  );
};

export default App;
