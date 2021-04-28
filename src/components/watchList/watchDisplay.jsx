import { Container, Row, Col, Form, Card } from "react-bootstrap";
import "../home/Home.css";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import WatchDisplay from "./WatchMovieDisplay";

const WatchListView = (props) => {
  const [movieResults, setMovieResults] = useState([]);
  const [movie_ID, setMovie_ID] = useState([]);
  const userContext = useContext(UserContext);

  useEffect(() => {
    // if(UserContext.isAuth){
    fetch(`//${process.env.REACT_APP_SERVER_API_URL}/review/watched`, {
      method: "POST",
      body: JSON.stringify({ favorite: true }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      }),
    })
      .then((res) => res.json())
      .then((res) => setMovieResults(res));
    // }else{
    //   console.log('no movies');
    // }
  }, []);
  // console.log(movieResults);
  return (
    <>
      {" "}
      <Container
        className="pt-5 watch"
        //  onMouseOver={mousePosition()}
      >
        <Row noGutters>
          {/* Main Content */}
          <Col xs={12} className="movieDisplay">
            <div>
              {/* <ReviewIndex movie_id="634" /> */}
              <WatchDisplay results={movieResults} />
            </div>
          </Col>

          {/* Sidebar */}
          {/* <Col xs={3} style={{ paddingLeft: "5px" }}>
              <HomeSidebar />
            </Col> */}
        </Row>
      </Container>
    </>
  );
};

export default WatchListView;
