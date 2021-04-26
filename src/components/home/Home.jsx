import { Container, Row, Col, Form, Card } from "react-bootstrap";
import "./Home.css";
import HomeSidebar from "./HomeSidebar";
import HomeMovieCard from "./MovieCard";
import { useState, useEffect, useContext } from "react";
import UserContext from "../../contexts/UserContext";
import MovieDisplay from "./MovieDisplay";

const Home = (props) => {
  const [moviesResult, setMoviesResult] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const userContext = useContext(UserContext);

  useEffect(() => {
    //load popular movies
    if (searchInput == "") {
      fetch(
        // `${window.env.TMDB_API_URL}/movie/popular?region=US&api_key=${window.env.TMDB_API_KEY}`
        `${window.env.TMDB_API_URL}/trending/movie/week?api_key=${window.env.TMDB_API_KEY}`
      )
        .then((res) => res.json())
        .then((res) => setMoviesResult(res.results));
    } else {
      fetch(
        `${window.env.TMDB_API_URL}/search/movie?region=US&query=${searchInput}&api_key=${window.env.TMDB_API_KEY}`
      )
        .then((res) => res.json())
        .then((res) => setMoviesResult(res.results));
    }
  }, [searchInput]);

  return (
    <>
      <Container className="pt-5">
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
