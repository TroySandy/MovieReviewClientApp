import React, { useEffect, useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import UserContext from "../../contexts/UserContext";
import ReviewStars from "../movie/ReviewStars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye as eyeEmpty } from "@fortawesome/free-regular-svg-icons";
import { faHeart as heartEmpty } from "@fortawesome/free-regular-svg-icons";
import { faEye as eyeFull } from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartFull } from "@fortawesome/free-solid-svg-icons";

const ReviewEdit = (props) => {
<<<<<<< HEAD
  console.log(props);
  const [editReview, setEditReview] = useState(props.reviewToUpdate.description);
  const [editRating, setEditRating] = useState(props.reviewToUpdate.definition);
  const [editFavorite, setEditFavorite] = useState(props.reviewToUpdate.result);
  const [editWatched, setEditWatched] = useState(props.reviewToUpdate.result);
=======
  const userContext = useContext(UserContext);
  const [review, setReview] = useState(props.review.review);
  const [rating, setRating] = useState(props.review.rating);
  const [favorite, setFavorite] = useState(props.review.favorite);
  const [watched, setWatched] = useState(props.review.watched);
  const [movie_id, setMovie_id] = useState(props.movieId);
>>>>>>> develop

  const reviewUpdate = (e) => {
    e.preventDefault();

    fetch(`//${process.env.REACT_APP_SERVER_API_URL}/review/`, {
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
<<<<<<< HEAD
    <Modal isOpen={true}>
      <ModalHeader>Update your review</ModalHeader>
      <ModalBody>
        <Form onSubmit={reviewUpdate}>
          <FormGroup>
            <Label htmlFor="review">Edit Review</Label>
            <Input
              name="review"
              value={editReview}
              onChange={(e) => setEditReview(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="rating">Edit Rating</Label>
            <Input
              name="rating"
              value={editRating}
              onChange={(e) => setEditRating(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="favorite">Edit Favorite Status</Label>
            <CustomInput
              type="switch"
              id="favoriteSwitch"
              name="favorite"
              value="favorite"
              onClick={(e) => setEditFavorite(true)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="watched">
              Have you completed watching this movie?
            </Label>
            <CustomInput
              type="switch"
              id="watchedSwitch"
              name="watched"
              value="watched"
              onClick={(e) => setEditWatched(true)}
            />
          </FormGroup>
          <Button type="submit" onclick={reviewUpdate} onCLick={props.updateOff}>Update your Review!</Button>
        </Form>
      </ModalBody>
    </Modal>
=======
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
          <Button type="submit">Click to Submit Your Review!</Button>
        </div>
      </Form>
    </>
>>>>>>> develop
  );
};

export default ReviewEdit;
