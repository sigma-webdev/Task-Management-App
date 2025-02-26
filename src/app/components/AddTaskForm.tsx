"use client";

import { useState } from "react";
import { createTask } from "../lib/actions";

export default function AddTaskForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setFormError("");

    try {
      const result = await createTask(formData);

      if (!result.success) {
        setFormError(result.error || "Failed to create task");
        return;
      }

      // Reset form
      const form = document.getElementById("add-task-form") as HTMLFormElement;
      form.reset();
    } catch (error: any) {
      setFormError(error.message || "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="card mb-8">
      <h2 className="text-xl font-semibold mb-4">Add New Task</h2>

      {formError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {formError}
        </div>
      )}

      <form id="add-task-form" action={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            className="input-field"
            placeholder="Enter task title"
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
            className="input-field"
            rows={3}
            placeholder="Enter task description"
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="status" className="block mb-2">
            Status
          </label>
          <select id="status" name="status" className="input-field">
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Adding..." : "Add Task"}
        </button>
      </form>
    </div>
  );
}
