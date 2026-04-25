import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.access_token);
      navigate('/tasks');
    } catch (err) {
      setError('Falha no login. Verifique suas credenciais e tente novamente.');
    }
  };

  return (
    <div>
        <h2>Login</h2>
        {error && <p style= {{color : 'red'}}>{error}</p>}
        <form onSubmit={hanadleLogin}>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            <input
                type="password"
                placeholder="Password"
                value = {email}
                onChange={(e) => setPassword(e.target.value)}
                />
            <button type ="submit">Entrar</button>
        </form>
        <p> Nao tens conta? <a href= "/register">Regista-te </a></p>
    </div>
  );
}

export default Login;
