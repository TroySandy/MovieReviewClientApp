import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import UserContext from "../../contexts/UserContext";
import ReviewStars from "../movie/ReviewStars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye as eyeEmpty } from "@fortawesome/free-regular-svg-icons";
import { faEye as eyeFull } from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartEmpty } from "@fortawesome/free-regular-svg-icons";
import { faHeart as heartFull } from "@fortawesome/free-solid-svg-icons";

const ReviewCreate = (props) => {
  const userContext = useContext(UserContext);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(3);
  const [favorite, setFavorite] = useState(false);
  const [watched, setWatched] = useState(true);
  const [movie_id, setMovie_id] = useState(props.movieId);

  let handleSubmit = (e) => {
    e.preventDefault();

    fetch(`//${process.env.REACT_APP_SERVER_API_URL}/review/`, {
      method: "POST",
      body: JSON.stringify({
        review,
        rating,
        favorite,
        watched,
        movie_id,
        owner_id: userContext.user.id,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      }),
    })
      .then((res) => res.json())
      .then((reviewData) => {
        setReview("");
        setRating(3);
        setFavorite(false);
        setWatched(true);
        props.fetchReviews();
        props.handleClose();
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <Form onSubmit={handleSubmit} className="p-3">
        <Form.Group>
          <Form.Label>Please leave a review:</Form.Label>
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
          <Button type="submit" variant="danger">Click to Submit Your Review!</Button>
        </div>
      </Form>
    </>
  );
};

export default ReviewCreate;
