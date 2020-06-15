// #1 Import the constructor Schema and the model() method
// Note the use of ES6 desctructuring
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// #2 Instantiate a schema using mongoose Schema
const launchSchema = new Schema({
  flight_number: {
    type: Number
  },
  mission_name: {
    type: String
  },
  launch_year: {
    type: String
  },
  launch_date_local: {
    type: Date,
    default: Date.now
  },
  launch_success: {
    type: Boolean
  },
  rocket: {
    rocket_id:{type: String},
    rocket_name:{type: String},
    rocket_type:{type: String}
  }
});

// #3 Create a model with mongoose model() method
module.exports = Launch = mongoose.model('launch', launchSchema);