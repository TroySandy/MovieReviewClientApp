import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Table,
  OverlayTrigger,
  Button,
  Image,
  Tooltip,
} from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router";
import UserContext from "../../contexts/UserContext";
import ReviewStars from "../movie/ReviewStars";
import ReviewDisplay from "../review/ReviewDisplay";
import ReviewCreate from "../review/ReviewCreate";
import ReviewEdit from "../review/ReviewEdit";
import { Modal } from "react-bootstrap";
// import MovieDisplay from "./HomeMovieDisplay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye as eyeFull } from "@fortawesome/free-solid-svg-icons";
import SimilarMovies from "../similar/similarMovies";
import config from "../../config";

// import { faHeart as heartFull } from "@fortawesome/free-solid-svg-icons";

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return () => setValue((value) => value + 1);
}

const WatchList = (props) => {
  // console.log(props);
  const forceUpdate = useForceUpdate();
  const { movie_id } = useParams();
  const userContext = useContext(UserContext);

  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showCreateModal, setCreateShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [watched, setWatched] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [cast, setCast] = useState([]);

  const handleCreateClose = () => setCreateShowModal(false);
  const handleCreateOpen = () => {
    //TODO: CHECK IF USER HAS A REVIEW, IF YES, SHOW EDIT INSTEAD
    if (userContext.isAuth) {
      if (reviews.some((r) => r.owner_id === userContext.user.id)) {
        handleEditOpen();
      } else {
        setCreateShowModal(true);
      }
    }
  };

  const handleEditClose = () => setShowEditModal(false);
  const handleEditOpen = () => setShowEditModal(true);

  useEffect(() => {
    fetchCast();
    fetchMovie();
    fetchReviews();
  }, []);

  useEffect(() => {
    forceUpdate();
  }, [reviews]);

  const fetchCast = () => {
    fetch(
      `${config.REACT_APP_TMDB_API_URL}/movie/${movie_id}/credits?api_key=${config.REACT_APP_TMDB_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        setCast(res);
      });
  };

  const fetchMovie = () => {
    fetch(
      `${config.REACT_APP_TMDB_API_URL}/movie/${movie_id}?api_key=${config.REACT_APP_TMDB_API_KEY}&append_to_response=similar`
    )
      .then((res) => res.json())
      .then((res) => {
        setMovie(res);
        // console.log(res);
      });
  };
  // console.log("movie", movie);

  const fetchReviews = () => {
    fetch(`${config.REACT_APP_SERVER_API_URL}/review/movie`, {
      method: "POST",
      body: JSON.stringify({ movie_id: movie_id }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setReviews([...res]);

        setFavorite(
          res.find((r) => r.owner_id === userContext.user.id && r.favorite)
        );
        setWatched(
          res.find((r) => r.owner_id === userContext.user.id && r.watched)
        );
      });
  };

  return (
    <>
      {movie && (
        <Container className="watch py-3 mt-5">
          <Row noGutters>
            <Col xs={6} className="position-relative">
              <img
                width="100%"
                src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}`}
              />
              <div className="position-absolute" style={{ top: 0, right: 0 }}>
                <FontAwesomeIcon
                  className="m-2"
                  size="2x"
                  color={watched ? "white" : "grey"}
                  icon={eyeFull}
                />
                {/* <FontAwesomeIcon
                    className="m-2"
                    size="2x"
                    color={favorite ? "red" : "grey"}
                    icon={heartFull}
                  /> */}
              </div>
            </Col>
            <Col className="position-relative pl-3">
              <div
                className="position-absolute w-100 pr-3"
                // style={{ bottom: 0 }}
              >
                <h2 className="text-center mt-5 px-3">{movie.title}</h2>
                <h6 className="text-center mb-5 px-3">{movie.tagline}</h6>
                <p className="px-3">{movie.overview}</p>
                <hr />

                {cast.cast.map((castMember, index) => {
                  if (index > 4) return;
                  return (
                    <>
                      <OverlayTrigger
                        placement="top"
                        trigger="hover"
                        overlay={
                          <Tooltip id={"tooltip-top"}>
                            <div>{castMember.character}</div>
                            <div>Played By: {castMember.name}</div>
                          </Tooltip>
                        }
                      >
                        <img
                          src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${castMember.profile_path}`}
                          alt=""
                          width="20%"
                          // height="130px"
                        />
                      </OverlayTrigger>
                    </>
                  );
                })}

                <div className="w100 px-3 d-flex justify-content-between">
                  <div className="">
                    Genre: {movie.genres.map((g) => g.name).join("/")}
                  </div>
                  <div className="">
                    Runtime:{" "}
                    {`${Math.floor(movie.runtime / 60)}h ${
                      movie.runtime % 60
                    }m`}
                  </div>
                </div>
                <div className="w100 px-3 d-flex justify-content-between">
                  {userContext.isAuth ? (
                    <div className="" onClick={handleCreateOpen}>
                      {reviews &&
                      reviews.some(
                        (r) => r.owner_id === userContext.user.id
                      ) ? (
                        <a
                          style={{
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                        >
                          Edit your review
                        </a>
                      ) : (
                        <a
                          style={{
                            textDecoration: "underline",
                            cursor: "pointer",
                          }}
                        >
                          Leave a review
                        </a>
                      )}
                    </div>
                  ) : (
                    <div>Please login to leave a review.</div>
                  )}

                  <div className="">
                    <ReviewStars showNumerical value={movie.vote_average / 2} />
                  </div>
                </div>
              </div>
              {/* <ReviewIndex movie_id={movie.id}/> */}
              <hr />
            </Col>
          </Row>
          {console.log(movie)}
          <hr />
          <Row className="justify-content-center mb-3">
            {reviews && reviews.length > 0 ? (
              reviews.map((review) => {
                return (
                  <ReviewDisplay
                    key={review.id + review.updatedAt}
                    review={review}
                    showEditModal={handleEditOpen}
                    fetchReviews={fetchReviews}
                  />
                );
              })
            ) : (
              <>
                <h3 className="p-5">
                  There are no reviews on this movie. Be the first?
                </h3>
              </>
            )}
          </Row>
          <Container>
            <SimilarMovies movie={movie} />
          </Container>
        </Container>
      )}

      <Modal centered show={showCreateModal} onHide={handleCreateClose}>
        <Modal.Body>
          <ReviewCreate
            fetchReviews={fetchReviews}
            movieId={movie_id}
            title={movie && movie.title}
            handleClose={handleCreateClose}
          />
        </Modal.Body>
      </Modal>

      <Modal centered show={showEditModal} onHide={handleEditClose}>
        <Modal.Body>
          <ReviewEdit
            fetchReviews={fetchReviews}
            review={
              reviews && reviews.find((r) => r.owner_id === userContext.user.id)
            }
            handleClose={handleEditClose}
            forceUpdate={forceUpdate}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WatchList;
