import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assume API to register user here
    navigate('/login');
  };

  return (
    <div>
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <select onChange={(e) => setRole(e.target.value)} value={role}>
        <option value="admin">Admin</option>
          <option value="user">Job Seeker</option>
          <option value="company">Company</option>
        </select>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
