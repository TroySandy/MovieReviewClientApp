import { Row, Col } from "react-bootstrap";
import WatchedCard from "./WatchMovieCard";

const WatchDisplay = (props) => {
  console.log(props);

  return (
    <Row noGutters className="pt-3 viewRow">
      {props.results.map((movie) => {
        console.log(movie);
        return (
          <Col key={movie.id} xs={3}>
            <WatchedCard movie={movie} />
          </Col>
        );
      })}
    </Row>
  );
};

export default WatchDisplay;
