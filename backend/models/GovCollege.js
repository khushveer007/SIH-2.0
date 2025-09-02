const mongoose = require('mongoose');

const govCollegeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  location: {
    city: String,
    state: String,
    country: String
  },
  coursesOffered: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  establishedYear: Number
}, { timestamps: true });

module.exports = mongoose.model('GovCollege', govCollegeSchema);
