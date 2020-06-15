import gql from 'graphql-tag';
export const LAUNCHES_QUERY = gql`
  query LaunchesQuery {
    launches {
      flight_number
      mission_name
      launch_date_local
      launch_success
      rocket{
        rocket_id
        rocket_name
        rocket_type
      }
    }
  }
`;

export const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_success
      launch_date_local
      rocket {
        rocket_id
        rocket_name
        rocket_type
      }     
    }
  }`;

  export const ADD_LAUNCH = gql`
  mutation($flight_number: Int!, 
    $mission_name: String!,
    $launch_year: String!,
    $launch_success: Boolean!,
    $rocket: addRocket!) {
    addLaunch(flight_number: $flight_number,
      mission_name: $mission_name,
      launch_year: $launch_year,
      launch_success: $launch_success,
      rocket: $rocket
      ) {
        flight_number
        mission_name
        launch_year
        launch_success
    }
  }
`;

export const DELETE_LAUNCH = gql`
  mutation($flight_number: Int!) {
    deleteLaunch(flight_number: $flight_number) {
      flight_number
    }
  }
`;

export const UPDATE_LAUNCH = gql`
  mutation($flight_number: Int!, 
    $mission_name: String, 
    $launch_year: String,
    $launch_success: Boolean,
    $rocket: addRocket) {
    updateLaunch(flight_number: $flight_number,
      mission_name: $mission_name,
      launch_year: $launch_year,
      launch_success: $launch_success,
      rocket: $rocket) {
      flight_number
    }
  }
`;