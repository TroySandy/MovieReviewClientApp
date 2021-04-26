import { Container, Row, Col, Form, Card } from "react-bootstrap";
import "./Home.css";
import HomeSidebar from "./HomeSidebar";
import HomeMovieCard from "./HomeMovieCard";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import MovieDisplay from "./HomeMovieDisplay";
import ReviewIndex from "../review/ReviewIndex";

const Home = (props) => {
  const [moviesResult, setMoviesResult] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const userContext = useContext(UserContext);

  useEffect(() => {
    //load popular movies
    if (searchInput == "") {
      fetch(
        // `${window.env.TMDB_API_URL}/movie/popular?region=US&api_key=${window.env.TMDB_API_KEY}`
        `${process.env.REACT_APP_TMDB_API_URL}/trending/movie/week?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      )
        .then((res) => res.json())
        .then((res) => setMoviesResult(res.results));
    } else {
      fetch(
        `${process.env.REACT_APP_TMDB_API_URL}/search/movie?region=US&query=${searchInput}&api_key=${process.env.REACT_APP_TMDB_API_KEY}`
      )
        .then((res) => res.json())
        .then((res) => setMoviesResult(res.results));
    }
  }, [searchInput]);

  return (
    <>
      <Container className="pt-5 body">
        <Row noGutters>
          {/* Main Content */}
          <Col xs={9}>
            {/* Search */}
            <Row>
              <Col>
                <Form.Control
                  className="movie-search"
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search..."
                />
              </Col>
            </Row>
            {/* <div>
              <ReviewIndex movie_id="634" />
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
