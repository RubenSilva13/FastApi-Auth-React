import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Register() {
    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState ('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await api.post('/auth/register', {email, password})
            navigate('/');
        }catch (err) {
            setError('Falha no registro. Verifique suas credenciais e tente novamente.');
        }
    };

   return (
  <div className="min-h-screen bg-gray-100 flex items-center justify-center">
    <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Registo</h2>
      {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Registar
        </button>
      </form>
      <p className="text-center text-sm text-gray-500 mt-4">
        Já tens conta? <a href="/" className="text-blue-600 hover:underline">Faz login</a>
      </p>
    </div>
  </div>
 );
}
export default Register;
