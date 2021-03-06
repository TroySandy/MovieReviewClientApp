import { useContext, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import UserContext from "../../contexts/UserContext";
import "./Login.css";
import config from "../../config";

const Login = (props) => {
  let { setToken } = useContext(UserContext);

  let [username, setUsername] = useState("");

  let [password, setPassword] = useState("");
  let [error, setError] = useState("");

  const handleLogin = () => {
    let fetchBody = {
      username,
      password,
    };

    fetch(`${config.REACT_APP_SERVER_API_URL}/user/login`, {
      method: "POST",
      body: JSON.stringify(fetchBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status != 200) {
          setError("Invalid username or password.");
        } else {
          //redirect to home
          props.history.push("/");
        }
        return res.json();
      })
      .then((res) => {
        if (!res.error) {
          setToken(res.token);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <>
      <Container className="mb-5">
        <Row className="justify-content-center pt-5">
          <Col xs={6}>
            <Card>
              <Card.Body>
                <h1 className="text-center">Login</h1>
                <hr />
                <div className="text-center pb-2" style={{ color: "red" }}>
                  {error}
                </div>
                <Form>
                  <Form.Group as={Row} controlId="formGroupUsername">
                    <Form.Label column sm="auto">
                      Username
                    </Form.Label>
                    <Col>
                      <Form.Control
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                      />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formGroupPassword">
                    <Form.Label column sm="auto">
                      Password
                    </Form.Label>
                    <Col>
                      <Form.Control
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                      />
                    </Col>
                  </Form.Group>
                  <Form.Row className="justify-content-center">
                    <LinkContainer to="/register">
                      <div className="registerBtnOut">
                        <Button
                          className="registerBtnMid"
                          variant="outline-secondary"
                        >
                          Register<span></span>
                          <span></span>
                          <span></span>
                          <span></span>
                        </Button>
                      </div>
                    </LinkContainer>
                    <div className="submitBtnOut">
                      <Button
                        className="submitBtnMid"
                        onClick={() => {
                          handleLogin();
                        }}
                        variant="outline-danger"
                      >
                        Sign In
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </Button>
                    </div>
                  </Form.Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
