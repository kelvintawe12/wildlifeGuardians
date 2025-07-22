const mongoose = require('mongoose');
const AnimalSchema = new mongoose.Schema({
  threats: {
    type: [String],
    default: []
  },
  name: {
    type: String,
    required: [true, 'Please provide an animal name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide an animal description']
  },
  image_url: {
    type: String,
    required: [true, 'Please provide an image URL']
  },
  conservation_status: {
    type: String,
    enum: ['Least Concern', 'Near Threatened', 'Vulnerable', 'Endangered', 'Critically Endangered', 'Extinct in the Wild', 'Extinct'],
    required: [true, 'Please provide a conservation status']
  },
  habitat: {
    type: String,
    required: [true, 'Please provide habitat information']
  },
  diet: {
    type: String,
    required: [true, 'Please provide diet information']
  },
  fun_facts: {
    type: [String],
    default: []
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: null
  }
});
module.exports = mongoose.model('Animal', AnimalSchema);