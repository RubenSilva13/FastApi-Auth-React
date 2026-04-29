import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Tasks () {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('media');
    const [filterPriority, setFilterPriority] = useState('');
    const [filterCompleted, setFilterCompleted] = useState('');
    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editDescription, setEditDescription] = useState('');
    const [editPriority, setEditPriority] = useState('media');
    const navigate = useNavigate();

    const fetchTasks = async () => {
    try {
        const params = {};
        if (filterPriority) params.priority = filterPriority;
        if (filterCompleted !== '') params.completed = filterCompleted;
        const response = await api.get('/tasks/', { params });
        setTasks(response.data);
    } catch (err) {
        navigate('/');
    }
};

    useEffect(() => {
        fetchTasks();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filterPriority, filterCompleted]);

    
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

    const handleComplete = async (task) => {
      try {
          await api.put(`/tasks/${task.id}`, {completed: !task.completed });
          fetchTasks();
      } catch (err) {
          console.error(err);
      }
    }

    const handleEdit = (task) => {
      setEditId(task.id);
      setEditTitle(task.title);
      setEditDescription(task.description || '');
      setEditPriority(task.priority);
    }

    const handleUpdate = async (id) => {
      try {
          await api.put(`/tasks/${id}`, { title: editTitle, description: editDescription, priority: editPriority });
          setEditId(null);
          fetchTasks();
      } catch (err) {
          console.error(err);
      }
    }

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

                <div className="bg-white p-4 rounded-xl shadow-md mb-6 flex gap-3">
                    <select
                        value={filterPriority}
                        onChange={(e) => setFilterPriority(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Todas as prioridades</option>
                        <option value="baixa">Baixa</option>
                        <option value="media">Média</option>
                        <option value="alta">Alta</option>
                    </select>
                    <select
                        value={filterCompleted}
                        onChange={(e) => setFilterCompleted(e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Todas</option>
                        <option value="false">Por concluir</option>
                        <option value="true">Concluídas</option>
                    </select>
                </div>

                {/* Lista de tarefas */}
                <ul className="space-y-3">
                    {tasks.map((task) => (
                        <li key={task.id} className="bg-white p-4 rounded-xl shadow-md">
                            {editId === task.id ? (
                                <div className="space-y-2">
                                    <input
                                        type="text"
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <input
                                        type="text"
                                        value={editDescription}
                                        onChange={(e) => setEditDescription(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <select
                                        value={editPriority}
                                        onChange={(e) => setEditPriority(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="baixa">Baixa</option>
                                        <option value="media">Média</option>
                                        <option value="alta">Alta</option>
                                    </select>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => handleUpdate(task.id)}
                                            className="flex-1 bg-blue-600 text-white py-1 rounded-lg hover:bg-blue-700 transition text-sm"
                                        >
                                            Guardar
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setEditId(null)}
                                            className="flex-1 bg-gray-400 text-white py-1 rounded-lg hover:bg-gray-500 transition text-sm"
                                        >
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex justify-between items-start">
                                    <div className="flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            checked={task.completed}
                                            onChange={() => handleComplete(task)}
                                            className="mt-1 w-4 h-4 cursor-pointer"
                                        />
                                        <div>
                                            <p className={`font-bold text-gray-800 ${task.completed ? 'line-through text-gray-400' : ''}`}>
                                                {task.title}
                                            </p>
                                            {task.description && (
                                                <p className="text-gray-500 text-sm">{task.description}</p>
                                            )}
                                            <span className={`text-xs font-semibold px-2 py-1 rounded-full mt-1 inline-block ${
                                                task.priority === 'alta' ? 'bg-red-100 text-red-600' :
                                                task.priority === 'media' ? 'bg-yellow-100 text-yellow-600' :
                                                'bg-green-100 text-green-600'
                                            }`}>
                                                {task.priority}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(task)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition text-sm"
                                        >
                                            Editar
                                        </button>
                                        <button
                                            onClick={() => handleDelete(task.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition text-sm"
                                        >
                                            Remover
                                        </button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );

  }

export default Tasks;
