import { Suspense } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import { getTasks } from "../app/lib/actions";

// Example of how to fetch data using API route
async function fetchTasksFromAPI() {
  const res = await fetch("http://localhost:3001/api/tasks", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tasks from API");
  }

  const data = await res.json();
  return data.tasks;
}

// Example of how to use Server Component with async data
async function TasksContainer() {
  // Get tasks using Server Action (main approach)
  // const tasks = await getTasks();

  // Alternative: Using API Route via fetch
  // Uncomment to use this approach instead of the Server Action
  const tasks = await fetchTasksFromAPI();

  return <TaskList tasks={tasks} />;
}

export default function Home() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <AddTaskForm />
      </div>

      <div className="lg:col-span-2">
        <Suspense fallback={<div>Loading tasks...</div>}>
          <TasksContainer />
        </Suspense>
      </div>
    </div>
  );
}
