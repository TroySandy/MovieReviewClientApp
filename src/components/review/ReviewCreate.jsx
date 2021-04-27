import React, { useContext, useState } from "react";
import { Button, Form, FormGroup, Label, Input, CustomInput } from "reactstrap";
import UserContext from "../../contexts/UserContext";

const ReviewCreate = (props) => {
  const userContext = useContext(UserContext);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("");
  const [favorite, setFavorite] = useState(false);
  const [watched, setWatched] = useState(false);
  const [movie_id, setMovie_id] = useState(643);
  const [owner_id, setOwner_id] = useState("");

  let handleSubmit = (e) => {
    console.log(review, rating, favorite, watched, movie_id, );
    e.preventDefault();

    fetch(`//${process.env.REACT_APP_SERVER_API_URL}/review/`, {
      method: "POST",
      body: JSON.stringify({
        review,
        rating,
        favorite,
        watched,
        movie_id: 460465,
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
        setRating("");
        setFavorite(false);
        setWatched(false);
        setMovie_id("");
        setOwner_id("");
        props.fetchReviews();
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <h2>Create Your Movie Review</h2>
      <Form onSubmit={handleSubmit}>
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
            value={favorite}
            label="Is this one of your favorite"
            onClick={(e) => setFavorite(!favorite)}
          />
        </div>
        <div>
          <Label htmlFor="watched" />
          <CustomInput
            type="switch"
            id="watchedSwitch"
            name="watched"
            value={watched}
            label="Have you seen this movie?"
            onClick={(e) => setWatched(!watched)}
          />
        </div>
        <div>
          <Label htmlFor="movie_id" />
        </div>
        <div>
          <Label htmlFor="owner_id" />
        </div>
        <Button type="submit" onClick={handleSubmit}>Click to Submit Your Review!</Button>
      </Form>
    </>
  );
};

export default ReviewCreate;
