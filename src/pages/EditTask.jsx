import TaskForm from '../components/Taskform';
import { getTaskById, updateTask } from '../api/taskApi';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Loader2, Edit3 } from 'lucide-react';

export default function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const { data } = await getTaskById(id);
        setTask(data);
      } catch (error) {
        console.error('Failed to fetch task:', error);
      }
    };
    fetchTask();
  }, [id]);

  const handleSubmit = async (updatedData) => {
    await updateTask(id, updatedData);
    navigate('/');
  };

  if (!task) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Loader2 className="animate-spin w-10 h-10 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 mb-10 px-4 w-full max-w-3xl">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="text-center mb-8 flex items-center justify-center gap-2 text-blue-600">
          <Edit3 className="w-6 h-6" />
          <h2 className="text-3xl font-bold">Edit Task</h2>
        </div>
        <TaskForm initialValues={task} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
