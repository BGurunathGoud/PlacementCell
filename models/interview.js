const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    students: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
        },
        result: {
          type: String,
          enum: ["PASS", "FAIL", "On Hold", "Didn't Attempt"],
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Interview = new mongoose.model("Interview", interviewSchema);

module.exports = Interview;
