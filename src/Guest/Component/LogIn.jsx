import { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";
import "../Guest.css";
import { UserContext } from "../../Context/context";
import { API_URL } from "../../config";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function LogIn() {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const LoginUser = (e) => {
    e.preventDefault();

    axios
      .post(`${API_URL}/api/users/login`, { Email, Password })
      .then((json) => {
        // the context saves the token cookie and sets the auth header
        dispatch({ type: "USER_LOGIN", token: json.data.token });
        navigate("/");
      })
      .catch((err) => {
        Swal.fire({
          title: "Login failed",
          text:
            err.response?.data?.message ||
            "Could not reach the server. Please try again.",
          icon: "error",
        });
      });
  };
  return (
    <>
      <Form onSubmit={LoginUser}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Enter email"
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
                placeholder="Password"
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
        <Button className="slbtn d-flex justify-content-center" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}
