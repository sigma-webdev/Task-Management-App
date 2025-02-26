"use client";

import { useState } from "react";
import { ITask } from "../model/Task";
import { deleteTask } from "../lib/actions";
import UpdateTaskForm from "./UpdateTaskForm";

interface TaskCardProps {
  task: ITask;
}

export default function TaskCard({ task }: TaskCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const statusColors = {
    pending: "bg-yellow-100 text-yellow-800",
    "in-progress": "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
  };

  const statusColor = statusColors[task.status] || statusColors.pending;

  async function handleDelete() {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setIsDeleting(true);

      try {
        await deleteTask(task._id as string);
      } catch (error) {
        console.error("Error deleting task:", error);
        alert("Failed to delete task");
      } finally {
        setIsDeleting(false);
      }
    }
  }

  if (isEditing) {
    return (
      <div className="card mb-4">
        <UpdateTaskForm
          task={task}
          onCancel={() => setIsEditing(false)}
          onSuccess={() => setIsEditing(false)}
        />
      </div>
    );
  }

  return (
    <div className="card mb-4">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold">{task.title}</h3>
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor}`}
        >
          {task.status.replace("-", " ")}
        </span>
      </div>

      <p className="text-gray-600 mb-4">{task.description}</p>

      <div className="flex justify-between text-sm text-gray-500 mb-4">
        <span>
          Created: {new Date(task.createdAt as Date).toLocaleDateString()}
        </span>
        {task.updatedAt && task.updatedAt !== task.createdAt && (
          <span>
            Updated: {new Date(task.updatedAt as Date).toLocaleDateString()}
          </span>
        )}
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => setIsEditing(true)}
          className="btn btn-secondary"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="btn btn-danger"
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
