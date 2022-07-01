const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema(
  {
    code: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Code = mongoose.models.Code || mongoose.model('Code', codeSchema);

module.exports = Code;
