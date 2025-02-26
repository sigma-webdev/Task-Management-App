import mongoose, { Schema } from "mongoose";

export interface ITask {
  _id?: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  createdAt?: Date;
  updatedAt?: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, "Please provide a title for this task."],
      maxlength: [60, "Title cannot be more than 60 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description for this task."],
      maxlength: [1000, "Description cannot be more than 1000 characters"],
    },
    status: {
      type: String,
      required: [true, "Please provide a status for this task."],
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export const Task =
  mongoose.models.Task || mongoose.model<ITask>("Task", TaskSchema);
