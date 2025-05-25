import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assuming API validation here, set role from response
    if (email === 'admin@example.com') {
      navigate('/admin');
    } else if (email === 'company@example.com') {
      navigate('/company');
    } else {
      navigate('/user');
    }
  };

  return (
    <div>
      <h2>Login</h2>
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
        {/* <select onChange={(e) => setRole(e.target.value)} value={role}>
        <option value="admin">Admin</option>
          <option value="user">Job Seeker</option>
          <option value="company">Company</option>
        </select> */}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
