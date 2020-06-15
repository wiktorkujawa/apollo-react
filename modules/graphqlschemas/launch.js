
module.exports = `
  type Rocket {
    rocket_id: String
    rocket_name: String
    rocket_type: String
  },
  type Launch {
    _id: ID,
    flight_number: Int,
    mission_name: String,
    launch_year: String,
    launch_date_local: String,
    launch_success: Boolean,
    rocket: Rocket
  },
  type Query {
    launches: [Launch]
    launch(flight_number:Int!): Launch
  },
  input addRocket {
    rocket_id: String!
    rocket_name: String!
    rocket_type: String!
   }
  type Mutation {
      addLaunch(flight_number: Int!,
        mission_name: String!,
        launch_year: String!,
        launch_success: Boolean!,
        rocket: addRocket!
         ): Launch,
  
      deleteLaunch(flight_number: Int!): Launch,
  
      updateLaunch(flight_number: Int!,
        mission_name: String,
        launch_year: String,
        launch_success: Boolean,
        rocket: addRocket
        ): Launch
  }
`;