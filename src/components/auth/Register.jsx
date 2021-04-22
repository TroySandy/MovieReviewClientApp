import { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import env from "react-dotenv";

const Register = (props) => {
  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [verifyEmail, setVerifyEmail] = useState("");
  let [password, setPassword] = useState("");
  let [verifyPassword, setVerifyPassword] = useState("");
  let [error, setError] = useState([]);

  const handleRegister = () => {
    let fetchBody = {
      firstName,
      lastName,
      username,
      password,
      email,
    };

    fetch(`http://localhost:4000/user/register`, {
      method: "POST",
      body: JSON.stringify(fetchBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status != 201) {
          setError(["Something is very wrong."]);
          console.log("error");
        } else {
          //redirect to login
          console.log("Success");
          props.history.push("/login");
        }
        return res.json();
      })
      .then((res) => console.log(res))
      .catch((err) => {
        setError([err.message]);
      });
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center pt-5">
          <Col xs={7}>
            <Card>
              <Card.Body>
                {error ? error.map((e) => <div>{e}</div>) : null}
                <Form>
                  <Form.Row>
                    <Col>
                      <Form.Group controlId="formGroupFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formGroupFirstName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col>
                      <Form.Group controlId="formGroupUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          type="text"
                        />
                      </Form.Group>
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col>
                      <Form.Group controlId="formGroupEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="email"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formGroupVerifyEmail">
                        <Form.Label>Verify Email</Form.Label>
                        <Form.Control
                          value={verifyEmail}
                          onChange={(e) => setVerifyEmail(e.target.value)}
                          type="email"
                        />
                      </Form.Group>
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col>
                      <Form.Group controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          type="password"
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formGroupVerifyPassword">
                        <Form.Label>Verify Password</Form.Label>
                        <Form.Control
                          value={verifyPassword}
                          onChange={(e) => setVerifyPassword(e.target.value)}
                          type="password"
                        />
                      </Form.Group>
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col>
                      <Button onClick={() => handleRegister()}>Register</Button>
                    </Col>
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

export default Register;
