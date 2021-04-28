import { Card } from "react-bootstrap";
import '../site/Site.css'

const Footer = (props) => {
  return (
    <Card bg="danger" variant="danger">
      <Card.Body>
        <Card.Header className="fonts" id="footer">
        Copyright © 2021 - PrintView
        </Card.Header>
      </Card.Body>
    </Card>
  )
};

export default Footer;
