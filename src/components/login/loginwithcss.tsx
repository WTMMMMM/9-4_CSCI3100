// LoginPage.tsx
import React, { useState } from 'react';
import './login.css';
// Add this import at the top of your LoginPage.tsx
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state to track login status
  const navigate = useNavigate();

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  
  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  // Simulated response data
  const fakeResponse = {
    token: 'fake-jwt-token',
    error: null,
  };

  try {
    // Simulate the server response delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Fake login data for demonstration purposes
    const fakeUsername = 'user123';
    const fakePassword = 'password123';

    // Check credentials (do not use this in production)
    if (username === fakeUsername && password === fakePassword) {
      // If login is successful, navigate to the home page
      navigate({ pathname: '/' }) ;
    } else {
      // If login failed, set an error message
      setError('Invalid username or password.');
    }
  } catch (error) {
    setError('An error occurred during login.');
    setIsLoggedIn(false);
  }
  };
  

  const handleSignUpClick = () => {
   navigate('/signup'); // Implement navigation to the signup page or logic for opening the signup form/modal
  };
  

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" value={username} onChange={handleUsernameChange} required />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" value={password} onChange={handlePasswordChange} required />
        </div>
        <div>
          <button type="submit">Submit</button> {/* Change to type="submit" to submit the form */}
        </div>
        <div>
        <Link to ="/signup">
        <button type= "submit">Sign Up</button>
        </Link>

        </div>
        
      </form>

    </div>
  );
};

export default LoginPage;