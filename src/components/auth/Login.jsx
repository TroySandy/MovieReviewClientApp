import { Container, Row, Col, Card, Form } from "react-bootstrap";

const Login = (props) => {
  let test = "";

  return (
    <>
      <Container>
        <Row className="justify-content-center pt-5">
          <Col xs={7}>
            <Card>
              <Card.Body>
                <Form>
                  <Form.Group as={Row} controlId="formGroupFirstName">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
                  <Form.Group as={Row} controlId="formGroupFirstName">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="text" />
                  </Form.Group>
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
