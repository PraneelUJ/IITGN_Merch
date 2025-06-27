import React, { useRef, useState } from "react";
import { Card, Form, Button, Container, Alert } from "react-bootstrap";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import {  Link } from "react-router-dom";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg,setmsg]=useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(
        emailRef.current.value,
        passwordRef.current.value,
        passwordConfirmRef.current.value
      );
      setmsg("User Added Successfully");
    } catch (error) {
      setError(error.message || "Failed to create account");
    }
    setLoading(false);
  }

  return (
    <Container className="d-flex align-items-cenetr justify-content-center">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Sign Up</h2>
            
            {error && <Alert variant="danger">{error}</Alert>}
            {!error && msg && <Alert variant="success">{msg}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>

              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>

              <Form.Group id="password-confirm">
                <Form.Label>Password Confirmation</Form.Label>
                <Form.Control
                  type="password"
                  ref={passwordConfirmRef}
                  required
                />
              </Form.Group>
              <Button disabled={loading} type="submit" className="w-100 mt-3">
                Sign Up
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Already have an Account? <Link to="/login">Log In</Link>
        </div>
      </div>
    </Container>
  );
}
