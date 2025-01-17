import { useContext } from "react";
import { Form, Row, Col, Stack, Button, Alert } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const {
    registerInfo,
    updateRegisterInfo,
    registerUser,
    registerError,
    isRegisterLoading,
  } = useContext(AuthContext);

  return (
    <>
      <Form onSubmit={registerUser}>
        <Row
          style={{
            height: "100vh",
            justifyContent: "center",
            paddingTop: "10%",
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Sign up</h2>

              <Form.Control
                placeholder="Name"
                value={registerInfo.name}
                onChange={(e) => updateRegisterInfo({ name: e.target.value })}
              />
              <Form.Control
                placeholder="Email"
                value={registerInfo.email}
                onChange={(e) => updateRegisterInfo({ email: e.target.value })}
              />
              <Form.Control
                type="password"
                placeholder="Password"
                value={registerInfo.password}
                onChange={(e) =>
                  updateRegisterInfo({ password: e.target.value })
                }
              />
              <Button variant="primary" type="submit">
                {isRegisterLoading ? "Createing your account" : "Register"}
              </Button>
              {registerError?.error && (
                <Alert variant="danger">
                  <p>{registerError?.message}</p>
                </Alert>
              )}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Register;
