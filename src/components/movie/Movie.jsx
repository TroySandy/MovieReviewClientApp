import { useEffect, useContext, useState } from "react";
import { useParams } from "react-router";
import "./Movie.css";
import ReviewStars from "./ReviewStars";
import ReviewDisplay from "../review/ReviewDisplay";
import ReviewCreate from "../review/ReviewCreate";
import ReviewEdit from "../review/ReviewEdit";
import { Modal, Col, Container, Row } from "react-bootstrap";
import UserContext from "../../contexts/UserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye as eyeFull } from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartFull } from "@fortawesome/free-solid-svg-icons";

function useForceUpdate() {
  const [value, setValue] = useState(0);
  return () => setValue((value) => value + 1);
}

const Movie = (props) => {
  const forceUpdate = useForceUpdate();
  const { movie_id } = useParams();
  const userContext = useContext(UserContext);

  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [showCreateModal, setCreateShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [watched, setWatched] = useState(false);
  const [favorite, setFavorite] = useState(false);

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
    fetchMovie();
    fetchReviews();
  }, []);

  useEffect(() => {
    forceUpdate();
  }, [reviews]);

  const fetchMovie = () => {
    fetch(
      `${process.env.REACT_APP_TMDB_API_URL}/movie/${movie_id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
    )
      .then((res) => res.json())
      .then((res) => {
        setMovie(res);
      });
  };

  const fetchReviews = () => {
    fetch(`//${process.env.REACT_APP_SERVER_API_URL}/review/movie`, {
      method: "POST",
      body: JSON.stringify({ movie_id: movie_id }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        //setReviews([...res]);
        let realReviews = res;

        setFavorite(
          res.find((r) => r.owner_id === userContext.user.id && r.favorite)
        );
        setWatched(
          res.find((r) => r.owner_id === userContext.user.id && r.watched)
        );

        //fetch
        fetch(
          `${process.env.REACT_APP_TMDB_API_URL}/movie/${movie_id}/reviews?api_key=${process.env.REACT_APP_TMDB_API_KEY}`
        )
          .then((res) => res.json())
          .then((res) => {
            const reviewsArr = [];

            res.results.map((r) => {
              let reviewObj = {
                id: r.id,
                review: r.content,
                rating: r.author_details.rating / 2,
                updatedAt: r.updated_at,
                user: {
                  id: 9999999,
                  firstName: "",
                  lastName: "",
                  username: r.author_details.username,
                },
              };

              reviewsArr.push(reviewObj);
            });

            setReviews([...realReviews, ...reviewsArr]);
          });
      });
  };

  return (
    <>
      {movie && (
        <Container className="movie py-3 mt-5">
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
                <FontAwesomeIcon
                  className="m-2"
                  size="2x"
                  color={favorite ? "red" : "grey"}
                  icon={heartFull}
                />
              </div>
            </Col>
            <Col className="position-relative pl-3">
              <div
                className="position-absolute w-100 pr-3"
                style={{ bottom: 0 }}
              >
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
              <h2 className="text-center mt-5 px-3">{movie.title}</h2>
              <h6 className="text-center mb-5 px-3">{movie.tagline}</h6>
              <p className="px-3">{movie.overview}</p>

              {/* <ReviewIndex movie_id={movie.id}/> */}
            </Col>
          </Row>
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

export default Movie;
