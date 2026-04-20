import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 15,
    },

    role: {
      type: String,
      required: true,
      enum: ["student", "recruiter"],
      default: "student",
    },

    profile: {
      bio: { type: String },
      skills: [{ type: String }],
      resume: { type: String },
      resumeOriginalName: { type: String },
      profilePhoto: {
        type: String,
        default: "",
      },
      company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company',
      },
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
