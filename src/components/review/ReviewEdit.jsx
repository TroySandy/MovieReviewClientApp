import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import UserContext from "../../contexts/UserContext";
import ReviewStars from "../movie/ReviewStars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye as eyeEmpty } from "@fortawesome/free-regular-svg-icons";
import { faHeart as heartEmpty } from "@fortawesome/free-regular-svg-icons";
import { faEye as eyeFull } from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartFull } from "@fortawesome/free-solid-svg-icons";
import config from "../../config";

const ReviewEdit = (props) => {
  const userContext = useContext(UserContext);
  const [review, setReview] = useState(props.review.review);
  const [rating, setRating] = useState(props.review.rating);
  const [favorite, setFavorite] = useState(props.review.favorite);
  const [watched, setWatched] = useState(props.review.watched);
  // const [movie_id, setMovie_id] = useState(props.movieId);

  const reviewUpdate = (e) => {
    e.preventDefault();

    fetch(`${config.REACT_APP_SERVER_API_URL}/review/`, {
      method: "PUT",
      body: JSON.stringify({
        id: props.review.id,
        review,
        rating,
        favorite,
        watched,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      }),
    })
      .then((res) => {
        props.fetchReviews();
        props.handleClose();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Form onSubmit={reviewUpdate} className="p-3">
        <Form.Group>
          <Form.Label>Please edit your review:</Form.Label>
          <Form.Control
            as="textarea"
            value={review}
            onChange={(e) => {
              setReview(e.target.value);
            }}
            rows={3}
          />
        </Form.Group>

        <div className="d-flex justify-content-center">
          <ReviewStars
            value={rating}
            size="36pt"
            spacing="1.5rem"
            clickable
            onChange={setRating}
          />
        </div>

        <div className="d-flex justify-content-center mt-3">
          <div className="px-3">
            <p className="mx-auto text-center w-100">
              <FontAwesomeIcon
                onClick={() => setWatched(!watched)}
                size="2x"
                icon={watched ? eyeFull : eyeEmpty}
                color={watched ? "black" : "lightgrey"}
                style={{ cursor: "pointer" }}
              />
            </p>
            <p>Watched</p>
          </div>
          <div className="px-3">
            <p className="mx-auto text-center w-100">
              <FontAwesomeIcon
                onClick={() => setFavorite(!favorite)}
                size="2x"
                icon={favorite ? heartFull : heartEmpty}
                color={favorite ? "red" : "lightgrey"}
                style={{ cursor: "pointer" }}
              />
            </p>
            <p>Favorite</p>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <Button type="submit" variant="danger">
            Click to Submit Your Review!
          </Button>
        </div>
      </Form>
    </>
  );
};

export default ReviewEdit;
