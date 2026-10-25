import { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";
import "../Pages/SignLog.css";
import { UserContext } from "../../Context/context.jsx";
import { API_URL } from "../../config";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function Sign() {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Number, setNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const showError = (err) =>
    Swal.fire({
      title: "Sign up failed",
      text:
        err.response?.data?.message ||
        "Could not reach the server. Please try again.",
      icon: "error",
    });

  // everyone signs up as a normal user; admins are set up in the database
  const SignUpUser = (e) => {
    e.preventDefault();
    const payload = { Name, Email, Password, Number };

    axios
      .post(`${API_URL}/api/users/signup`, payload)
      .then(() =>
        axios.post(`${API_URL}/api/users/login`, { Email, Password })
      )
      .then((json) => {
        dispatch({ type: "USER_LOGIN", token: json.data.token });
        navigate("/");
      })
      .catch(showError);
  };
  return (
    <>
      <Form onSubmit={SignUpUser}>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Name"
            value={Name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={Email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <div className="row">
            <div className="col-8 slpass">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password (min 6 characters)"
                value={Password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="col-3 slvisib">
              {showPassword ? (
                <AiFillEyeInvisible
                  size={27}
                  className="mt-1 "
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <AiFillEye
                  size={27}
                  className="mt-1 "
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="tel"
            placeholder="Phone number"
            value={Number}
            onChange={(e) => {
              setNumber(e.target.value);
            }}
          />
        </Form.Group>

        <Button type="submit" className="slbtn d-flex justify-content-center">
          Submit
        </Button>
      </Form>
    </>
  );
}
