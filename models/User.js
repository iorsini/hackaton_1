// /models/User.js
{/* 
Esse bloco de código define e exporta um modelo de dados (“model”) do MongoDB chamado User.
Ele descreve como um user deve ser armazenado no banco de dados.
*/}
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
}, {
  versionKey: false
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);