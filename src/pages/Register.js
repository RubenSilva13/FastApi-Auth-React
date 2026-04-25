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
        <div>
            <h2>Registo</h2>
            {error && <p style={{ color: 'red'}} >{error} </p>}
            <form onSubtmit={handleRegister}>
                <input
                    type = "email"
                    placeholder = "Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                   type="password"
                   placeholder="Password" 
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                /> 
                <button type ="submit">Registar </button>
            </form>
            <p> Ja tens conta? <a href="/"> Faz login </a></p>
        </div>
    );
}
export default Register;
