import { ITask } from "../model/Task";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: ITask[];
}

export default function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">
          No tasks found. Add a new task to get started!
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
}
