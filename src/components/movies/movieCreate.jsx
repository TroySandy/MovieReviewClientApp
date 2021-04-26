import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, CustomInput } from "reactstrap";

const ReviewCreate = (props) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [watched, setWatched] = useState(false);
  const [movie_id, setMovie_id] = useState("");
  const [owner_id, setOwner_id] = useState("");

  let handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/review/`, {
      method: "POST",
      body: JSON.stringify({
        review,
        rating,
        favorite,
        watched,
        movie_id,
        owner_id: props.owner_id,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${props.token}`,
      }),
    })
      .then((res) => res.json())
      .then((reviewData) => {
        setReview("");
        setRating("");
        setFavorite(false);
        setWatched(false);
        setMovie_id("");
        setOwner_id("");
        props.fetchReviews();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <h2>Create Your Movie Review</h2>
      <Form onClick={handleSubmit}>
        <div>
          <Label htmlFor="review" />
          <Input
            name="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="rating" />
          <Input
            name="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="favorite" />
          <CustomInput
            type="switch"
            id="favoriteSwitch"
            name="favorite"
            value="favorite"
            label="Is this one of your favorite"
            onClick={(e) => setFavorite(true)}
          />
        </div>
        <div>
          <Label htmlFor="watched" />
          <CustomInput
            type="switch"
            id="watchedSwitch"
            name="watched"
            value="watched"
            label="Have you seen this movie?"
            onClick={(e) => setWatched(true)}
          />
        </div>
        <div>
          <Label htmlFor="movie_id" />
        </div>
        <div>
          <Label htmlFor="owner_id" />
        </div>
        <Button type="submit">Click to Submit Your Review!</Button>
      </Form>
    </>
  );
};

export default ReviewCreate;
