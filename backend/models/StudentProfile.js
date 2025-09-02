const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  fullName: { type: String, required: true },
  age: { type: Number, min: 10, max: 120 },
  academicDetails: {
    currentLevel: String,
    gpa: Number,
    interests: [String]
  }
}, { timestamps: true });

module.exports = mongoose.model('StudentProfile', studentProfileSchema);
