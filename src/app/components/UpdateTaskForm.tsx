"use client";

import { useState } from "react";
import { ITask } from "../model/Task";
import { updateTask } from "../lib/actions";

interface UpdateTaskFormProps {
  task: ITask;
  onCancel: () => void;
  onSuccess: () => void;
}

export default function UpdateTaskForm({
  task,
  onCancel,
  onSuccess,
}: UpdateTaskFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setFormError("");

    try {
      const result = await updateTask(task._id as string, formData);

      if (!result.success) {
        setFormError(result.error || "Failed to update task");
        return;
      }

      onSuccess();
    } catch (error: any) {
      setFormError(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Update Task</h2>

      {formError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {formError}
        </div>
      )}

      <form action={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            defaultValue={task.title}
            className="input-field"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            defaultValue={task.description}
            className="input-field"
            rows={3}
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block mb-2">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={task.status}
            className="input-field"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex space-x-2">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Task"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
