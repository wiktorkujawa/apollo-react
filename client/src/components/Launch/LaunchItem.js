import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { DELETE_LAUNCH, UPDATE_LAUNCH } from '../../schemas/Launch';
import {
  Button, Form,
  FormGroup,
  Label,
  Input,
  Modal, ModalBody, ModalHeader
} from 'reactstrap';


const LaunchItem = ({ launch: { flight_number, mission_name, launch_year, launch_date_local, launch_success, rocket: { rocket_id, rocket_name, rocket_type }}, refetchLaunches }) => {
  const launch_date = new Date(parseInt(launch_date_local));

  const year = launch_date.getFullYear();
  const month = launch_date.getMonth() + 1 < 10 ? '0'+(launch_date.getMonth() + 1).toString() : launch_date.getMonth() + 1 ;
  const day = launch_date.getDate() <10 ? '0'+launch_date.getDate().toString() : launch_date.getDate() ;

 

  const [newLaunch, setNewLaunch] = useState({
    flight_number:flight_number,
    mission_name: mission_name,
    launch_year: launch_year,
    launch_success: launch_success,
    rocket_id: rocket_id,
    rocket_name: rocket_name,
    rocket_type: rocket_type
  });

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  const [updateLaunch] = useMutation(UPDATE_LAUNCH);

  const onChange = e => {
    e.target.name!=="launch_success" ?
    setNewLaunch({
      ...newLaunch,
      [e.target.name]: e.target.value
    }) :
    setNewLaunch({
      ...newLaunch,
      [e.target.name]: document.getElementById("launch_success").checked
    })
  };
  
  const onSubmit = async (id) => {
    await updateLaunch({ variables: { flight_number: id, 
      mission_name: newLaunch.mission_name, 
      launch_year: newLaunch.launch_year,
      launch_success: newLaunch.launch_success,
      rocket: {
        rocket_id: newLaunch.rocket_id,
        rocket_name: newLaunch.rocket_name,
        rocket_type: newLaunch.rocket_type
      }} }); 
    refetchLaunches()
}


  const [deleteLaunch] = useMutation(DELETE_LAUNCH);
  
  const onDeleteClick = async (id) =>{
    await deleteLaunch({ variables: { flight_number: id }})
    refetchLaunches()
  }

  

  return (
    <div className="card card-body mb-3">
      <Button color="danger" className="delete-btn" onClick={onDeleteClick.bind(this, flight_number)}>X</Button>

      <Modal
        style={{position: "relative",
          top: "50%",
          transform: "translateY(-50%)"
        }}
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Update Launch</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit.bind(this, flight_number)}>
            <FormGroup>

              <Label for="mission_name">Mission name</Label>
              <Input type="text" name="mission_name" id="mission_name" placeholder="Add mission name..." defaultValue={mission_name}
                onChange={onChange}/>
              
              <Label for="launch_year">Launch Year</Label>
              <Input type="text" name="launch_year" id="launch_year" placeholder="Add launch year..." defaultValue={launch_year}
                onChange={onChange}/>

              <br/>
              <Label for="launch_success">Launch success:</Label>
              <Input type="checkbox" name="launch_success" id="launch_success" className="ml-2"
              defaultChecked={launch_success }
                onChange={onChange}/>

                <legend>Rocket data</legend>
                <FormGroup>

              <Label for="rocket_id">Rocket ID</Label>
              <Input type="text" name="rocket_id" id="rocket_id" placeholder="Add rocket ID..." defaultValue={rocket_id}
                onChange={onChange}/>
              
              <Label for="rocket_name">Rocket name</Label>
              <Input type="text" name="rocket_name" id="rocket_name" placeholder="Add rocket name..." defaultValue={rocket_name}
                onChange={onChange}/>

              <Label for="rocket_type">Rocket type</Label>
              <Input type="text" name="rocket_type" id="rocket_type" placeholder="Add rocket type..." defaultValue={rocket_type}
                onChange={onChange}/>
                </FormGroup>

              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Update Launch
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>

      <div className="row">
        <div className="col-md-9">
          <h4>Mission: <span className={launch_success ? 'text-success': 'text-danger'}>
            {mission_name}
            </span>
          </h4>
          <p>Date: {`${year}-${month}-${day}`}</p>
        </div>
        <div className="col-md-3">
          <Link to={`/launches/launch/${flight_number}`} className="btn btn-secondary">Launch Details</Link>
          <Button color="info" onClick={toggle}>Update Launch</Button>
        </div>
      </div>
    </div>
  )
}

export default LaunchItem
