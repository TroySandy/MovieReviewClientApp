import { Row, Col } from "react-bootstrap";
import MovieCard from "./MovieCard";

const MovieDisplay = (props) => {
  console.log(props.results);

  return (
    <Row noGutters className="pt-3">
      {props.results.map((movie) => {
        return (
          <Col xs={3}>
            <MovieCard movie={movie} />
          </Col>
        );
      })}
    </Row>
  );
};

export default MovieDisplay;
