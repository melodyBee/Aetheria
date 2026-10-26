import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Logo from '../../assets/favicon2light.png'
export default function NavGuest() {
    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg">
            <Container>
                <Link className="brand-font navbar-brand" to="/">
                    <img
                        src={Logo}
                        alt=""
                        style={{ width: '50px', height: 'auto' }} // Set your exact pixel size
                        className="d-inline-block align-top"
                    />
                    Aetheria
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Link className="nav-link " to="/SignLog">
                            <Button variant="secondary">Login | SignUp</Button>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}
