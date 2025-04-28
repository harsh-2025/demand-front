import { useEffect, useState } from "react";
import { getTasks } from "../api/taskApi";
import TaskCard from "./TaskCard"; // Keep if you want to use cards instead of table rows
import { useNavigate } from "react-router-dom";

const statuses = ["All", "Pending", "Completed", "Backlog"];
const priorities = ["All", "Low", "Medium", "High"];
const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Completed: "bg-green-100 text-green-800",
  Backlog: "bg-gray-100 text-gray-800",
  All: "bg-gray-200 text-gray-600",
};

const priorityColors = {
  Low: "bg-blue-100 text-blue-800",
  Medium: "bg-orange-100 text-orange-800",
  High: "bg-red-100 text-red-800",
  All: "bg-gray-200 text-gray-600",
};

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const navigate = useNavigate();

  const fetchTasks = async () => {
    const { data } = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) => {
    const statusMatch = statusFilter === "All" || task.status === statusFilter;
    const priorityMatch =
      priorityFilter === "All" || task.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  return (
    <div className="p-4">
      {/* Filters + Create button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mb-6 space-y-4 sm:space-y-0">
        {/* Status Filter */}
        <div>
          <label
            htmlFor="statusFilter"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Status
          </label>
          <select
            id="statusFilter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        {/* Priority Filter */}
        <div>
          <label
            htmlFor="priorityFilter"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Priority
          </label>
          <select
            id="priorityFilter"
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="block w-full border border-gray-300 rounded-md shadow-sm py-1.5 px-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          >
            {priorities.map((priority) => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </div>

        {/* Create Task Button */}
        <div className="sm:ml-auto">
          <button
            onClick={() => navigate("/create")}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            + Create Task
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-auto max-h-[500px] border border-gray-200 rounded-md shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 sticky top-0 bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Description
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Priority
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredTasks.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500">
                  No tasks found matching your filters.
                </td>
              </tr>
            ) : (
              filteredTasks.map((task) => (
                <tr key={task._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    {task.title}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                    {task.description?.length > 50
                      ? task.description.slice(0, 50) + "..."
                      : task.description || <em>No description</em>}
                  </td>
                  <td
                    
                  >
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      priorityColors[task.priority] ||
                      "bg-gray-100 text-gray-700"
                    }`}>{task.priority}</span>
                  </td>
                  <td
                    
                  >
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      statusColors[task.status] || "bg-gray-100 text-gray-700"
                    }`}>                    {task.status}
</span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-right">
                    <button
                      onClick={() => navigate(`/edit/${task._id}`)}
                      className="text-indigo-600 hover:text-indigo-900 font-medium"
                    >
                      Edit
                    </button>
                    {/* Add other actions like delete here */}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
