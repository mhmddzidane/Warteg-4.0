import React from 'react';
import { Nav, Navbar, NavDropdown,Container,Form,FormControl,Button} from 'react-bootstrap';
import styles from './index.css'

const NavbarComponents = () => {
  return (
    <div>
        <Navbar bg="success" variant='dark' expand="lg">
        <Container>
            {/* <Navbar.Brand href="#">Warteg Onlen</Navbar.Brand> */}
            <img className='logo' src='https://1.bp.blogspot.com/-kwzx-56nq9M/X543b_iGbiI/AAAAAAAAHZY/XljLDVYVYE4wR-Gx5spAx_t_9igRxY8GwCLcBGAsYHQ/s1154/warteg%2Bbahari.png'></img>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
            <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '150px' }}
                navbarScroll
            >
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Link</Nav.Link>
                <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                    Something else here
                </NavDropdown.Item>
                </NavDropdown>
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    </div>
    )
};

export default NavbarComponents;
