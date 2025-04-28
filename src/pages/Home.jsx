import TaskList from '../components/TaskList';
import { ChevronDown, CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto mt-10 mb-10 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 flex items-center justify-center gap-2 mb-2">
            <CheckCircle className="w-8 h-8 text-blue-600" />
            Task Manager
            <ChevronDown className="w-6 h-6 text-blue-600" />
          </h1>
          <p className="text-gray-500 text-lg">
            Manage your tasks efficiently — create, update, and track progress!
          </p>
        </div>

        <TaskList />
      </div>
    </div>
  );
}
