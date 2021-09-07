const mongoose = require("mongoose");

const documentScheme = new mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
});
