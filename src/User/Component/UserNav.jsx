import { useEffect, useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import Offcanvas from "react-bootstrap/Offcanvas";
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { Button } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import { UserContext } from "../../Context/context";
import { API_URL } from "../../config";

export default function UserNav() {
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { dispatch } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/category/get-all-categories`)
      .then((json) => setCategories(json.data.category))
      .catch((err) => console.log(err));
  }, []);

  const handleLogout = () => {
    dispatch({ type: "USER_LOGOUT" });
  };

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" expand="lg">
        <Container>
          <Link className="brand-font navbar-brand" to="/">
            Aetheria
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link onClick={handleShow}>Categories</Nav.Link>
              <Offcanvas
                className="bg-dark text-white"
                show={show}
                onHide={handleClose}
                placement="top"
              >
                <Offcanvas.Header>
                  <Offcanvas.Title>Categories</Offcanvas.Title>
                  <Button
                    variant="dark"
                    onClick={handleClose}
                    style={{
                      position: "absolute",
                      bottom: "20px",
                      right: "20px",
                    }}
                  >
                    <MdKeyboardDoubleArrowUp size={24} />
                  </Button>
                </Offcanvas.Header>
                <Offcanvas.Body data-bs-theme="dark">
                  <div className="container">
                    <div className="row">
                      {Array.isArray(categories) && categories.length > 0 ? (
                        categories.map((category) => (
                          <div key={category._id}>
                            <Link
                              className="nav-link text-decoration-none text-white"
                              to={`/products/category/${encodeURIComponent(
                                category.CategoryName
                              )}`}
                              onClick={handleClose}
                            >
                              {category.CategoryName}
                            </Link>
                          </div>
                        ))
                      ) : (
                        <p>No categories available.</p>
                      )}
                    </div>
                  </div>
                </Offcanvas.Body>
              </Offcanvas>
              <Link className="nav-link" to="/Products">
                Products
              </Link>
              <NavDropdown title="Profile" id="basic-nav-dropdown">
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
