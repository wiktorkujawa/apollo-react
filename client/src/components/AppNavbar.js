import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

import Register from './Register';
import Login from './Login';

import {
  NavLink as RRNavLink
} from 'react-router-dom';
// import dompurify from 'dompurify';
const AppNavbar = () => {
  // const sanitizer = dompurify.sanitize;

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  }

  // const upperNavbar =
  //   <>
  //     <NavbarToggler onClick={toggle} ></NavbarToggler>
  //     {contacts.map(({ _id, workTime, email, phoneNumber }) => (
  //       <Nav key={_id} navbar className="ml-xs-auto ml-md-auto mb-2">

  //         <NavItem className="align-items-center ml-1 nav-border mr-2" >
  //           <i className="fa fa-clock-o fa-2x align-items-center mr-2" aria-hidden="true">
  //             <span style={{ fontSize: "1rem" }} className="ml-1">
  //               {workTime}
  //             </span>  </i>
  //         </NavItem>
  //         <NavItem className="align-items-center mr-2 nav-border">
  //           <i className="fa fa-envelope fa-2x align-items-center mr-2" aria-hidden="true">
  //             <span style={{ fontSize: "1rem" }} className="ml-1">
  //               {email}
  //             </span>  </i>
  //         </NavItem>
  //         <NavItem className="align-items-center">
  //           <i className="fa fa-phone fa-2x align-items-center mr-2" style={{ whiteSpace: "nowrap" }} aria-hidden="true">
  //             <span className="ml-1 mt-2">
  //               <div dangerouslySetInnerHTML={{ __html: sanitizer(phoneNumber) }}></div>
  //             </span>
  //           </i>
  //         </NavItem>
  //       </Nav>
  //     ))
  //     }
  //   </>

  const lowerNavbar = <>
  <NavbarToggler onClick={toggle} ></NavbarToggler>
  <Collapse isOpen={isOpen} navbar style={{ textAlign: "center" }} className=" mx-lg-auto mx-xs-auto mb-2">

    <Nav navbar pills>
      <NavItem className="ml-3">
        <NavLink tag={RRNavLink} to="/posts" target={"_top"}>
          Posts
        </NavLink>
      </NavItem>

      <NavItem className="ml-3">
        <NavLink tag={RRNavLink} to="/launches" target={"_top"}>
          Launches
        </NavLink>
      </NavItem>

      <Register/>
      <Login/>

      {/* {isAuthenticated ?
        <NavItem className="ml-3" style={{ backgroundColor: "red", borderRadius: "15px" }}>
          <NavLink tag={RRNavLink} to="/admin-modal" target={"_top"}>
            Admin panel
        </NavLink>
        </NavItem> : null
      } */}
    </Nav>
  </Collapse>
  </>

  return (

    <Navbar color="light" light expand="md" className="main-navbar shadow-box" >

      <NavbarBrand href="/" className="mx-auto" >
        <img src="/main.png" width="240" height="120" alt="" />
      </NavbarBrand>
        {lowerNavbar}
    </Navbar >

  );
}

export default AppNavbar