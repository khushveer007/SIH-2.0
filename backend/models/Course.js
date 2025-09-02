const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  college: { type: mongoose.Schema.Types.ObjectId, ref: 'GovCollege', required: true },
  durationMonths: Number,
  active: { type: Boolean, default: true }
}, { timestamps: true });

courseSchema.index({ college: 1, name: 1 }, { unique: true });

module.exports = mongoose.model('Course', courseSchema);
