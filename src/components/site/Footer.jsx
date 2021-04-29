import { Card } from "react-bootstrap";
import "../site/Site.css";

const Footer = (props) => {
  return (
    <Card className="mt-5" bg="danger" variant="danger">
      <Card.Body className="text-center text-light">
        Copyright © 2021 - FlickView
      |  Powered by <a href="https://www.themoviedb.org/" className="text-white">TMDB</a>.
      </Card.Body>
    </Card>
  );
};

export default Footer;
