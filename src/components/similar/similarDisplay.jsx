import { Row, Col } from "react-bootstrap";
import SimilarCard from "./similarMovieCard";

const SimilarDisplay = (props) => {
  console.log(props);

  return (
    <Row noGutters className="viewRow">
      {props.results.map((movie, index) => {
        if(index >5)return;
        console.log(movie);
        return (
          <Col key={movie.id} xs={2}>
            <Row>

            <SimilarCard movie={movie} />
            </Row>
          </Col>
        );
      })}
    </Row>
  );
};

export default SimilarDisplay;
