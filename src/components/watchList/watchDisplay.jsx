import { Container, Row, Col } from "react-bootstrap";
import "../home/Home.css";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import WatchDisplay from "./WatchMovieDisplay";
import config from "../../config";

const WatchListView = (props) => {
  const [movieResults, setMovieResults] = useState([]);
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (userContext.isAuth) {
      fetch(`${config.REACT_APP_SERVER_API_URL}/review/watched`, {
        method: "POST",
        body: JSON.stringify({ favorite: true }),
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: `Bearer ${userContext.token}`,
        }),
      })
        .then((res) => res.json())
        .then((res) => setMovieResults(res));
    } else {
      props.history.push("/login");
    }
  }, []);

  return (
    <>
      {" "}
      <Container className="pt-5 watch">
        <Row noGutters>
          <h2 className="text-light">Your favorite & watched movies...</h2>
          <Col xs={12} className="movieDisplay">
            <div>
              <WatchDisplay results={movieResults} />
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default WatchListView;
