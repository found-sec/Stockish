// schema for folio data

import mongoose from 'mongoose';

const Portfolio = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  value: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    required: true,
    default: Date.now
  }
});

export default mongoose.model('Portfolio', Portfolio);