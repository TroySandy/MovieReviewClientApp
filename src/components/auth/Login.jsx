import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import UserContext from "../../contexts/UserContext";

const Login = (props) => {
  let { setToken } = useContext(UserContext);
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [error, setError] = useState([]);

  const handleLogin = () => {
    let fetchBody = {
      username,
      password,
    };

    fetch(`http://localhost:4000/user/login`, {
      method: "POST",
      body: JSON.stringify(fetchBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status != 200) {
          setError(["Something is very wrong."]);
          console.log("error");
        } else {
          //redirect to login
          console.log("Success");
          props.history.push("/");
        }
        return res.json();
      })
      .then((res) => {
        console.log(res);
        setToken(res.token);
      })
      .catch((err) => {
        setError([err.message]);
      });
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center pt-5">
          <Col xs={6}>
            <Card>
              <Card.Body>
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
                        type="text"
                      />
                    </Col>
                  </Form.Group>
                  <Form.Row className="justify-content-center">
                    <LinkContainer to="/register">
                      <Button className="mx-1">Register</Button>
                    </LinkContainer>
                    <Button
                      className="mx-1"
                      onClick={() => {
                        handleLogin();
                      }}
                    >
                      Sign In
                    </Button>
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
