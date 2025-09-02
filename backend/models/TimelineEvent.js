const mongoose = require('mongoose');

const timelineEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, default: Date.now },
  relatedEntity: {
    entityId: { type: mongoose.Schema.Types.ObjectId, required: false },
    entityType: { type: String, enum: ['User', 'StudentProfile', 'GovCollege', 'Course'], required: false }
  },
  metadata: mongoose.Schema.Types.Mixed
}, { timestamps: true });

timelineEventSchema.index({ date: -1 });

module.exports = mongoose.model('TimelineEvent', timelineEventSchema);
