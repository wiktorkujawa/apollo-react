import React from 'react'
import { useQuery } from '@apollo/react-hooks';
import LaunchItem from './LaunchItem';
import MissionKey from './MissionKey';
import AddLaunch from './AddLaunch';
import { LAUNCHES_QUERY } from '../../schemas/Launch';

const Launches = () => {
  const { 
    loading,
    error, 
    data,
    refetch: refetchLaunches 
  } = useQuery(LAUNCHES_QUERY);

  if (loading) return <p>Loading...</p>;

  if (error) {
    console.log(error);
    return <p>Error happen</p>;
  }

  return (
    <>
      <h1 className="display-4 my-3">Launches</h1>
      <MissionKey />
      {
        data.launches.map(launch => (
          <LaunchItem key={launch.flight_number} launch={launch} refetchLaunches={refetchLaunches} />
        ))
      }
      <AddLaunch refetchLaunches={refetchLaunches}/>
    </>
  )
}

export default Launches
