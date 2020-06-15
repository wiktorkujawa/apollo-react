import React, {useState} from 'react'
import { useMutation } from '@apollo/react-hooks';
import { ADD_LAUNCH } from '../../schemas/Launch';

import {
  Button, Form,
  FormGroup,
  Label,
  Input,
  Modal, ModalBody, ModalHeader, Row, Col
} from 'reactstrap';

const AddLaunch = ({refetchLaunches}) => {

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  const [newLaunch, setNewLaunch] = useState({
    flight_number:'',
    mission_name: '',
    launch_year: '',
    launch_success: false,
    rocket_id:'',
    rocket_name:'',
    rocket_type:''
  });

  const [addLaunch] = useMutation(ADD_LAUNCH);

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

  const onSubmit = async e => {
    e.preventDefault();
    
    await addLaunch({ variables: { 
      flight_number: parseInt(newLaunch.flight_number), 
      mission_name: newLaunch.mission_name,
      launch_year: newLaunch.launch_year,
      launch_success: newLaunch.launch_success,
      rocket: { 
        rocket_id: newLaunch.rocket_id,
        rocket_name:newLaunch.rocket_name,
        rocket_type:newLaunch.rocket_type
        }
      } 
    }); 
    refetchLaunches()
  }
  console.log(newLaunch);
  return (
    <div>
      <div style={{textAlign:"center"}}>
        <Button onClick={toggle}>Add launch</Button>
      </div>
      <Modal
        style={{position: "relative",
          top: "50%",
          transform: "translateY(-50%)"
        }}
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Add Launch</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="flight_number">Flight number</Label>
              <Input type="number" name="flight_number" id="flight_number" placeholder="Add flight number..." 
                onChange={onChange}/>

              <Label for="mission_name">Mission name</Label>
              <Input type="text" name="mission_name" id="mission_name" placeholder="Add mission name..."
                onChange={onChange}/>
              
              <Label for="launch_year">Launch Year</Label>
              <Input type="text" name="launch_year" id="launch_year" placeholder="Add launch year..."
                onChange={onChange}/>                             
                       
              <br/>
              <Label for="launch_success">Launch success:</Label>
              <Input type="checkbox" name="launch_success" id="launch_success" className="ml-2"
                onChange={onChange}/>

                <legend>Rocket data</legend>
                <FormGroup>
              <Label for="rocket_id">Rocket ID</Label>
              <Input type="text" name="rocket_id" id="rocket_id" placeholder="Add rocket ID..."
                onChange={onChange}/>
              
              <Label for="rocket_name">Rocket name</Label>
              <Input type="text" name="rocket_name" id="rocket_name" placeholder="Add rocket name..."
                onChange={onChange}/>

              <Label for="rocket_type">Rocket type</Label>
              <Input type="text" name="rocket_type" id="rocket_type" placeholder="Add rocket type..."
                onChange={onChange}/>
              </FormGroup>
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Add Launch
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default AddLaunch
