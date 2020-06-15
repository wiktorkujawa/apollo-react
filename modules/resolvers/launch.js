const Launch = require('../../models/launch');
const config = require('config');

module.exports  = {
  Query: {
    // Query which returns launches list
    launches: () => Launch.find({}),
    launch: (parent, launch) => Launch.findOne({flight_number:launch.flight_number})
  },

  Mutation: {
    addLaunch: (parent, launch) => {
      // Create a new record in the database
      const newLaunch = new Launch({ 
        flight_number: launch.flight_number, 
        mission_name: launch.mission_name, 
        launch_year: launch.launch_year, 
        launch_success: launch.launch_success, 
        rocket: launch.rocket 
      });
      // Save the record and return it
      return newLaunch.save();
    },
    deleteLaunch: (parent, launch) => {
      // Create a new record in the database
      if(!launch)
        throw new Error('Error');
      return Launch.findOneAndDelete({ flight_number: launch.flight_number })
    },
    updateLaunch: (parent, launch) => {
      // Create a new record in the database
      if(!launch)
        throw new Error('Error');
      return Launch.findOneAndUpdate({ flight_number: launch.flight_number },{ $set: launch })
    }
  }
};