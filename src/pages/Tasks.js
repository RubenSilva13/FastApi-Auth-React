import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Tasks () {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('media');
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
            await api.post('/tasks/', { title, description, priority });
            setTitle('');
            setDescription('');
            setPriority('media');
            fetchTasks();

        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.delete(`/tasks/${id}`);
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
  <div className="min-h-screen bg-gray-100 p-8">
    <div className="max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">As minhas tarefas</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <form onSubmit={handleCreate} className="bg-white p-4 rounded-xl shadow-md mb-6 space-y-3">
        <input
          type="text"
          placeholder="Nova tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="baixa">Baixa</option>
          <option value="media">Média</option>
          <option value="alta">Alta</option>
        </select>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Adicionar
        </button>
      </form>

      <ul className="space-y-3">
        {tasks.map((task) => (
          <li key={task.id} className="bg-white p-4 rounded-xl shadow-md flex justify-between items-start">
            <div>
              <p className="font-bold text-gray-800">{task.title}</p>
              {task.description && <p className="text-gray-500 text-sm">{task.description}</p>}
              <span className={`text-xs font-semibold px-2 py-1 rounded-full mt-1 inline-block ${
                task.priority === 'alta' ? 'bg-red-100 text-red-600' :
                task.priority === 'media' ? 'bg-yellow-100 text-yellow-600' :
                'bg-green-100 text-green-600'
              }`}>
                {task.priority}
              </span>
            </div>
            <button
              onClick={() => handleDelete(task.id)}
              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition text-sm"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
 );
}

export default Tasks;

