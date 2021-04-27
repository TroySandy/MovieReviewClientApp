import { Row, Col } from "react-bootstrap";
import SimilarCard from "./similarMovieCard";

const SimilarDisplay = (props) => {
  console.log(props);

  return (
    <Row noGutters className="pt-3 viewRow">
      {props.results.map((movie) => {
        console.log(movie);
        return (
          <Col key={movie.id} xs={3}>
            <SimilarCard movie={movie} />
          </Col>
        );
      })}
    </Row>
  );
};

export default SimilarDisplay;
