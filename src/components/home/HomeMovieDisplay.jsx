import { Row, Col } from "react-bootstrap";
import MovieCard from "./HomeMovieCard";

const MovieDisplay = (props) => {
  return (
    <Row noGutters className="pt-3 viewRow">
      {props.results.map((movie) => {
        return (
          <Col key={movie.id} xs={3}>
            <MovieCard movie={movie} />
          </Col>
        );
      })}
    </Row>
  );
};

export default MovieDisplay;
