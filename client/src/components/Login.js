import React, {useState} from 'react'
import { useMutation, useQuery } from '@apollo/react-hooks';
import { LOGIN, USER_QUERY, LOGOUT } from '../schemas/User';
import {
  Button, Form,
  FormGroup,
  Label,
  Input,
  Modal, ModalBody, ModalHeader, Alert
} from 'reactstrap';

const Login = () => {

  const [msg, setMsg] = useState('');
  const [newUser, setNewUser] = useState({
    email:'',
    password:''
  })

  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
    setMsg('');
  };


  const [alertColor, setAlertColor] = useState(null);

  const [login] = useMutation(LOGIN);

  const [logout] = useMutation(LOGOUT);

  const {
    loading,
    error,
    data,
    refetch: refetchLogin
  } = useQuery(USER_QUERY)

  if (loading) return <p>Loading...</p>;

  if (error) {
    console.log(error);
    return <p>Error happen</p>;
  }


  const onChange = e => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    }) 
  };

  const onSubmit = async e => {
    e.preventDefault();
    
    await login({ variables: { 
      email: newUser.email,
      password: newUser.password
      }
    })
    .then((res) => {
      const errors = res.data.login[0]
      if(errors.message==='Login successfull'){
       setAlertColor('success')
       refetchLogin();
      }
       else {setAlertColor('danger');}
      setMsg(errors.message);
    });; 
  };

  const onLogout = async e =>
  {
    e.preventDefault();
    await logout().
    then(res => refetchLogin())
  }

  console.log(data.user);

  return (
    <div>
      {!data.user ?
      <div style={{textAlign:"center"}}>
        <Button onClick={toggle}>Login</Button>
      </div>
      : <div style={{textAlign:"center"}}>
      <Button onClick={onLogout}>Logout</Button>
    </div>
      }
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

export default Login
