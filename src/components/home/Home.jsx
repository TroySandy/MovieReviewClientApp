import { Container, Row, Col, Form, Card } from "react-bootstrap";
import "./Home.css";
import HomeSidebar from "./HomeSidebar";
import HomeMovieCard from "./HomeMovieCard";
import { useState, useEffect } from "react";

const Home = (props) => {
  const [moviesResult, setMoviesResult] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    //load popular movies
    if (searchInput == "") {
      fetch(
        `${window.env.TMDB_API_URL}/movie/popular?api_key=${window.env.TMDB_API_KEY}`
      )
        .then((res) => res.json())
        .then((res) => setMoviesResult(res.results))
        .catch((err) => console.log(err))
    } else {
      fetch(
        `${window.env.TMDB_API_URL}/search/movie?query=${searchInput}&api_key=${window.env.TMDB_API_KEY}`
      )
        .then((res) => res.json())
        .then((res) => setMoviesResult(res.results))
        .catch((err) => console.log(err))
    }
  }, [searchInput]);

  return (
    <>
      <Container className="pt-f body pt-3">
        <Row>
          {/* Main Content */}
          <Col xs={9}>
            {/* Search */}
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search..."
                />
              </Col>
            </Row>

            {/* Movie Display */}
            <Row className="pt-3" style={{color: 'yellow'}}>
              {moviesResult.map((movie) => {
                return <HomeMovieCard movie={movie} />;
              })}
            </Row>
          </Col>

          {/* Sidebar */}
          <Col xs={3}>
            <HomeSidebar />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
