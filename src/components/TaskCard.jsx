import {
  CheckCircle,
  Edit3,
  Trash2,
  CheckSquare,
} from 'lucide-react';
import { deleteTask, updateTask } from '../api/taskApi';
import { useNavigate } from 'react-router-dom';

const statusColors = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Completed: 'bg-green-100 text-green-800',
  Backlog: 'bg-gray-100 text-gray-800',
};

const priorityColors = {
  High: 'bg-red-100 text-red-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Low: 'bg-blue-100 text-blue-800',
};

export default function TaskCard({ task, refreshTasks }) {
  const navigate = useNavigate();

  const handleDelete = async () => {
    await deleteTask(task._id);
    refreshTasks();
  };

  const handleMarkCompleted = async () => {
    await updateTask(task._id, { status: 'Completed' });
    refreshTasks();
  };

  return (
    <div
      className="mb-4 p-6 bg-white rounded-lg shadow-md hover:shadow-xl transform hover:scale-[1.02] transition duration-200"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold truncate max-w-[60%]">{task.title}</h3>

        <div className="flex space-x-2">
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${priorityColors[task.priority] || 'bg-gray-100 text-gray-800'}`}
          >
            {task.priority}
          </span>
          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 ${statusColors[task.status] || 'bg-gray-100 text-gray-800'}`}
          >
            {task.status}
            {task.status === 'Completed' && <CheckCircle className="w-4 h-4 text-green-600" />}
          </span>
        </div>
      </div>

      <p className="text-gray-600 mb-4 min-h-[40px] italic">
        {task.description || 'No description provided.'}
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => navigate(`/edit/${task._id}`)}
          className="flex items-center gap-1 border border-blue-600 text-blue-600 px-3 py-1 rounded hover:bg-blue-50 transition"
          aria-label="Edit Task"
          type="button"
          
        >
          <Edit3 className="w-4 h-4" /> Edit
        </button>

        <button
          onClick={handleDelete}
          className="flex items-center gap-1 border border-red-600 text-red-600 px-3 py-1 rounded hover:bg-red-50 transition"
          aria-label="Delete Task"
          type="button"
        >
          <Trash2 className="w-4 h-4" /> Delete
        </button>

        {task.status !== 'Completed' && (
          <button
            onClick={handleMarkCompleted}
            className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
            aria-label="Mark Task Completed"
            type="button"
          >
            <CheckSquare className="w-4 h-4" /> Mark Completed
          </button>
        )}
      </div>
    </div>
  );
}
