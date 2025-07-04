import React, { useRef, useState } from "react";
import { Card, Form, Button, Container, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import {  Link , useNavigate} from "react-router-dom";

export default function Signup({login,setlogin, user, setuser}) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
      setlogin(1);
      setuser(emailRef.current.value);
      console.log(emailRef.current.value);

    } catch (error) {
      setError(error.message || "Failed to login");
    }
    setLoading(false);
  }

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Log In</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>

              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>

              <Button disabled={loading} type="submit" className="w-100 mt-3">
                Login
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an Accout? <Link to="/signup">Signup</Link>
        </div>
      </div>
    </Container>
  );
}
