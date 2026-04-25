import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Tasks () {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const navigate = useNavigate();

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks/');
            setTasks(response.data);
        } catch (err) {
            navigate('/');
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await api.post('/tasks/', {title, description: '', priority: 'media'});
            setTitle('');
            fetchTasks();

        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/tasks/${id}/`);
            fetchTasks();
        } catch (err) {
            console.error(err);
        }
    }; 


    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };


    return (
        <div>
            <h2> As minhas tarefas</h2>
            <button onClick ={handleLogout}>Logout</button>
            <form onSubmit={handleCreate}>
                <input
                    type="text"
                    placeholder="Nova tarefa"
                    value= {title}
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <button type ="submit"> Adicionar</button>
            </form>
            <ul>
                {tasks.map((task)  => (
                <li key={task.id}>
                    {task.title}
                    <button onClick={() => handleDelete(task.id)}>Remover</button>
                </li>
                ))}
            </ul>
        </div>

    );
}

export default Tasks;

