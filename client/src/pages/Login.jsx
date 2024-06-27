import { useContext } from "react";
import { Form, Row, Col, Stack, Button, Alert } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { loginUser, loginError, loginInfo, updateLoginInfo, isLoginLoading } =
    useContext(AuthContext);

  return (
    <>
      <Form onSubmit={loginUser}>
        <Row
          style={{
            height: "100vh",
            justifyContent: "20%",
            paddingTop: "10%",
          }}
        >
          <Col xs={6}>
            <Stack gap={3}>
              <h2>Log in</h2>
              <Form.Control
                placeholder="Email"
                onChange={(e) =>
                  updateLoginInfo({
                    ...loginInfo,
                    email: e.target.value,
                  })
                }
              />
              <Form.Control
                placeholder="Password"
                onChange={(e) =>
                  updateLoginInfo({
                    ...loginInfo,
                    password: e.target.value,
                  })
                }
              />
              <Button variant="primary" type="submit">
                {isLoginLoading ? "Getting you in..." : "Log in"}
              </Button>
              {loginError?.error && (
                <Alert variant="danger">
                  <p>{loginError}</p>
                </Alert>
              )}
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Login;
