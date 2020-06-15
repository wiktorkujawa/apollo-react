import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';
import { LAUNCH_QUERY } from '../../schemas/Launch';

const Launch = ({ match: { params } }) => {
  let { flight_number } = params;
  flight_number = parseInt(flight_number);

  const { loading, error, data } = useQuery(LAUNCH_QUERY, {
    variables: { flight_number },
  });
  if (loading) return <p>Loading...</p>;

  if (error) {
    console.log(error);
    return <p>Error happen</p>;
  }

  const {
    mission_name,
    launch_year,
    launch_success,
    rocket: { rocket_id, rocket_name, rocket_type }
  } = data.launch;
  return (

    <div>
      <h1 className="display-4 my-3"><span className="text-dark">Mission: </span>{mission_name}</h1>
      <h4 className="mb-3">Launch Details </h4>
      <ul className="list-group">
        <li className="list-group-item">
          Flight Number: {flight_number}
        </li>
        <li className="list-group-item">
          Launch Year: {launch_year}
        </li>
        <li className="list-group-item">
          Launch Successfull: {' '}
          <span className={launch_success ? 'text-success' : 'text-danger'}>{launch_success ? 'Yes' : 'No'}</span>
        </li>
      </ul>
      <h4 className="my-3">Rocket Details</h4>
      <ul className="list-group">
        <li className="list-group-item">Rocket ID: {rocket_id}</li>
        <li className="list-group-item">Rocket Name: {rocket_name}</li>
        <li className="list-group-item">Rocket Type: {rocket_type}</li>
      </ul>
      <hr />
      <Link to="/launches" className="btn btn-secondary">Back</Link>
    </div>
  )
}

export default Launch
