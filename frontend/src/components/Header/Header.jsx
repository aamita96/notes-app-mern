import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';


export default function Header() {
    return (
        <Navbar expand="md" bg="primary" variant="dark">
            <Container>
                <Navbar.Brand>
                    <Link to="/">Notes App</Link>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="m-auto">
                        <Form>
                            <Form.Control
                                type="text"
                                placeholder="Search"
                                className="mr-sm-2"
                            />
                        </Form>
                    </Nav>
                    <Nav>
                        <Nav.Link as={Link} to="/mynotes">My Notes</Nav.Link>
                        {/* <Nav.Link href="#link">Link</Nav.Link> */}
                        <NavDropdown title="Amit Khatri" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/myprofile">My Profile</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="" className="text-danger">
                                Logout
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}