import { Container, Row, Col, Card, Form } from "react-bootstrap";

const Register = (props) => {
  return (
    <>
      <Container>
        <Row className="justify-content-center pt-5">
          <Col xs={7}>
            <Card>
              <Card.Body>
                <Form>
                  <Row>
                    <Col>
                      <Form.Group controlId="formGroupFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formGroupFirstName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row></Row>
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
