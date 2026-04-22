const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    ownerKey: {
      type: String,
      required: true,
      unique: true,
      default: 'main',
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    headline: {
      type: String,
      required: true,
      trim: true,
    },
    bio: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      default: '',
      trim: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    githubUrl: {
      type: String,
      default: '',
      trim: true,
    },
    linkedinUrl: {
      type: String,
      default: '',
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);
