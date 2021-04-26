import { useEffect, useState } from "react";
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
  let [errors, setErrors] = useState([]);
  let [validated, setValidated] = useState(false);

  const runValidation = () => {
    let errs = [];

    //handle validation
    if (firstName.length < 1) {
      errs.push("firstName");
    }
    if (lastName.length < 1) {
      errs.push("lastName");
    }
    if (username.length < 4 || !username.match(/[!@#$_0-9]/g)) {
      errs.push("username");
    }
    if (
      !email.match(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
      )
    ) {
      errs.push("emailWrong");
    }
    if (email != verifyEmail) {
      errs.push("emailVerify");
    }
    if (password.length < 5) {
      errs.push("passwordWrong");
    }
    if (password != verifyPassword) {
      errs.push("passwordVerify");
    }

    setErrors(errs);

    return errs;
  };

  useEffect(() => {
    if (validated) {
      setErrors(runValidation());
    }
  }, [
    firstName,
    lastName,
    username,
    password,
    verifyPassword,
    email,
    verifyEmail,
  ]);

  const handleRegister = () => {
    let fetchBody = {
      firstName,
      lastName,
      username,
      password,
      email,
    };

    let errs = runValidation();

    if (errs.length == 0) {
      fetch(`http://localhost:3000/user/register`, {
        method: "POST",
        body: JSON.stringify(fetchBody),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status != 201) {
            setErrors(["Something is very wrong."]);
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
          setErrors([err.message]);
        });
    } else {
      setErrors(errs);
      setValidated(true);
    }
  };

  return (
    <>
      <Container>
        <Row className="justify-content-center pt-5">
          <Col xs={7}>
            <Card>
              <Card.Body>
                <h1 className="text-center">Register</h1>
                <hr />
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
                        {errors.includes("firstName") && (
                          <Form.Control.Feedback
                            type="invalid"
                            className="d-block"
                          >
                            *Required
                          </Form.Control.Feedback>
                        )}
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formGroupLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          type="text"
                        />
                        {errors.includes("lastName") && (
                          <Form.Control.Feedback
                            type="invalid"
                            className="d-block"
                          >
                            *Required
                          </Form.Control.Feedback>
                        )}
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
                        {errors.includes("username") && (
                          <Form.Control.Feedback
                            type="invalid"
                            className="d-block"
                          >
                            *Required (Must be longer than 3 characters and
                            include one special character or number)
                          </Form.Control.Feedback>
                        )}
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
                        {errors.includes("emailWrong") && (
                          <Form.Control.Feedback
                            type="invalid"
                            className="d-block"
                          >
                            Invalid Email
                          </Form.Control.Feedback>
                        )}
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
                        {errors.includes("emailVerify") && (
                          <Form.Control.Feedback
                            type="invalid"
                            className="d-block"
                          >
                            Emails do not match
                          </Form.Control.Feedback>
                        )}
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
                        {errors.includes("passwordWrong") && (
                          <Form.Control.Feedback
                            type="invalid"
                            className="d-block"
                          >
                            Password must be 5 or more chars long
                          </Form.Control.Feedback>
                        )}
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
                        {errors.includes("passwordVerify") && (
                          <Form.Control.Feedback
                            type="invalid"
                            className="d-block"
                          >
                            Passwords do not match
                          </Form.Control.Feedback>
                        )}
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
