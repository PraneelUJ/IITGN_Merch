import React, { useRef, useState } from "react";
import { Card, Form, Button, Container, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import {  Link } from "react-router-dom";

export default function ForgotPassword({login,setlogin, user, setuser}) {
  const emailRef = useRef();
  
  const { resetpassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message,setMessage]=useState("");
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);
    try {
      await resetpassword(emailRef.current.value);
      setuser(emailRef.current.value);
      setMessage("Check your inbox for reset password email")
      console.log(emailRef.current.value);
    } catch (error) {
      setError(error.message || "Failed to reset password");
    }
    setLoading(false);
  }

  return (
    <Container className="d-flex align-items-center justify-content-center">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Reset Password</h2>

            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>

              

              <Button disabled={loading} type="submit" className="w-100 mt-3">
                Reset Password
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/login">Login</Link>
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
