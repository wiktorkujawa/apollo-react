import React, {useState} from 'react'
import { useMutation } from '@apollo/react-hooks';
import { REGISTER } from '../schemas/User';

import {
  Button, Form,
  FormGroup,
  Label,
  Input,
  Modal, ModalBody, ModalHeader, Alert
} from 'reactstrap';

const Register = () => {

  const [msg, setMsg] = useState('');
  const [newUser, setNewUser] = useState({
    email:'',
    name:'',
    password:''
  })

  
  
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
    setMsg('');
  };
  const [alertColor, setAlertColor] = useState(null);

  

  const [register] = useMutation(REGISTER);

  const onChange = e => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    }) 
  };

  const onSubmit = async e => {
    e.preventDefault();
    
    await register({ variables: { 
      email: newUser.email,
      name: newUser.name,
      password: newUser.password
      }
    })
    .then((res) => {
      const errors = res.data.register[0]
      errors.message==='New user registered' ? setAlertColor('success') : setAlertColor('danger');
      setMsg(errors.message);
    });; 
  };


  return (
    <div>
      <div style={{textAlign:"center"}}>
        <Button onClick={toggle}>Register</Button>
      </div>
      <Modal
        style={{position: "relative",
          top: "50%",
          transform: "translateY(-50%)"
        }}
        isOpen={modal}
        toggle={toggle}
      >
        <ModalHeader toggle={toggle}>Add new user</ModalHeader>
        <ModalBody>
        {msg ? (
            <Alert color={alertColor}>{msg}</Alert>
          ) : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="email" name="email" id="email" placeholder="Add email..." 
                onChange={onChange}/>

            <Label for="name">Name</Label>
              <Input type="name" name="name" id="name" placeholder="Add name..." 
                onChange={onChange}/>

              <Label for="password">Password</Label>
              <Input type="password" name="password" id="password" placeholder="Add password..."
                onChange={onChange}/>
            
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Add User
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default Register
