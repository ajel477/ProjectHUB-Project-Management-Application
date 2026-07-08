import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Project description is required"],
      trim: true,
    },

    status: {
      type: String,
      enum: ["Active", "Completed", "On Hold"],
      default: "Active",
      required: true,
    },

    deadline: {
      type: Date,
      required: [true, "Deadline is required"],
    },
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;