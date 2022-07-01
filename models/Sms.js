const mongoose = require('mongoose');

const smsSchema = new mongoose.Schema(
  {
    recipient: {
      type: Number,
      required: false,
    },
    text: {
      type: String,
      required: false,
    },
    user_id: {
      type: String,
      required: false,
    },
    date_recevied: {
      type: Number,
      required: false,
    },
    date_sent: {
      type: Number,
      required: false,
    },
    date_delivered: {
      type: Number,
      required: false,
    },
    message_id: {
      type: Number,
      required: false,
    },
    request_id: {
      type: Number,
      required: false,
    },
    status: {
      type: String,
      required: false,
    },
    count_messages: {
      type: String,
      required: false,
    },
    client_ip: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    }
  },
  {
    timestamps: true,
  }
);

const Sms = mongoose.models.Sms || mongoose.model('Sms', smsSchema);

module.exports = Sms;
