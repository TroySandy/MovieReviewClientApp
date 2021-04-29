import { Container, Row, Col, Form } from "react-bootstrap";
import "./Home.css";
import HomeSidebar from "./HomeSidebar";
import { useState, useEffect } from "react";
import MovieDisplay from "./HomeMovieDisplay";
import config from "../../config";

const Home = (props) => {
  const [moviesResult, setMoviesResult] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    //load popular movies
    if (searchInput == "") {
      fetch(
        `${config.REACT_APP_TMDB_API_URL}/trending/movie/week?api_key=${config.REACT_APP_TMDB_API_KEY}`
      )
        .then((res) => res.json())
        .then((res) => setMoviesResult(res.results))
        .catch((err) => console.log(err));
    } else {
      fetch(
        `${config.REACT_APP_TMDB_API_URL}/search/movie?region=US&query=${searchInput}&api_key=${config.REACT_APP_TMDB_API_KEY}`
      )
        .then((res) => res.json())
        .then((res) => setMoviesResult(res.results))
        .catch((err) => console.log(err));
    }
  }, [searchInput]);

  return (
    <>
      <Container
        className="pt-5"
        //  onMouseOver={mousePosition()}
      >
        <Row noGutters>
          {/* Main Content */}
          <Col xs={12} className="movieDisplay">
            {/* Search */}
            <Row className="pb-3">
              <Col>
                <Form.Control
                  className="movie-search btn-secondary"
                  id="search"
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search..."
                />
              </Col>
            </Row>
            {/* <div>
              <WatchListView />
            </div> */}
            {/* Movie Display */}
            <MovieDisplay results={moviesResult} />
          </Col>

          {/* Sidebar */}
          <Col xs={3} style={{ paddingLeft: "5px" }}>
            <HomeSidebar />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
