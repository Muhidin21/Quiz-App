import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Auth.css';
import './StartQuizButtom.css';

const Auth = () => {
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [showWelcome, setShowWelcome] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || (isSigningUp && !username)) {
      toast.error('Please fill out all fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    try {
      if (isSigningUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success(`Account created for ${email}!`);
        setIsSigningUp(false);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success(`Welcome ${email}!`);
        setShowWelcome(true);
      }
    } catch (error) {
      toast.error(error.message);
      setAuthError(error.message);
    }
  };

  const handleStartQuiz = () => {
    navigate('/quiz');
  };

  return (
    <div className="auth-container">
      <ToastContainer />
      {showWelcome ? (
        <div className="welcome-container">
          <h1>Welcome to Somali Quiz App</h1>
          <p>Click the button below to get started with the quiz.</p>
          <button className="start-quiz-button" onClick={handleStartQuiz}>
            Get Started
          </button>
        </div>
      ) : (
        <>
          <h1>Somali History Quiz</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {isSigningUp && (
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            )}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">{isSigningUp ? 'Create Account' : 'Sign In'}</button>
          </form>
          {authError && <p className="auth-error">{authError}</p>}
          <button onClick={() => setIsSigningUp(!isSigningUp)}>
            {isSigningUp ? 'Sign In' : 'Sign Up'}
          </button>
        </>
      )}
    </div>
  );
};

export default Auth;
