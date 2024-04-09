// SignUpPage.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SignUpRequest, SignUpResponse } from '../../models/models';
// Assume we have a signup service similar to the login service

function SignUpPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [accountType, setAccountType] = useState<'admin' | 'normal'>('normal');
  const [profileImageLink, setProfileImageLink] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleAccountTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setAccountType(event.target.value as 'admin' | 'normal');
  };

  const handleProfileImageLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProfileImageLink(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
   
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">Signup successful!</p>} {/* Display success message if signup succeeds */}

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
          <label htmlFor="address">Address</label>
          <input type="text" id="address" value={address} onChange={handleAddressChange} />
        </div>
        <div>
          <label htmlFor="accountType">Account Type</label>
          <select id="accountType" value={accountType} onChange={handleAccountTypeChange}>
            <option value="normal">Normal</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div>
          <label htmlFor="profileImageLink">Profile Image Link</label>
          <input type="text" id="profileImageLink" value={profileImageLink} onChange={handleProfileImageLinkChange} />
        </div>
        <div>
        <button type="submit">Sign Up</button>
        </div>
        <div className="button-group">

      <Link to="/login">
        <button type="button">Login</button>
      </Link>
      <Link to="/">
        <button type="button">Home</button>
      </Link>
    </div>
      </form>
    </div>
  );
};

export default SignUpPage;