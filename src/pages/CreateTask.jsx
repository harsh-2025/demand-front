import TaskForm from '../components/Taskform';
import { createTask } from '../api/taskApi';
import { useNavigate } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

export default function CreateTask() {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    await createTask(data);
    navigate('/');
  };

  return (
    <div className="container mx-auto  mt-10 mb-10 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="text-center mb-8 flex items-center justify-center gap-2 text-blue-600">
          <PlusCircle className="w-6 h-6" />
          <h2 className="text-3xl font-bold">Create New Task</h2>
        </div>
        <TaskForm
          initialValues={{ title: '', description: '', priority: 'Medium', status: 'Pending' }}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
