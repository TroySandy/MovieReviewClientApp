import React, { useState } from "react";
import {
  ModalHeader,
  ModalBody,
  Modal,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  CustomInput,
} from "reactstrap";

const ReviewEdit = (props) => {
  console.log(props);
  const [editReview, setEditReview] = useState(props.reviewToUpdate.description);
  const [editRating, setEditRating] = useState(props.reviewToUpdate.definition);
  const [editFavorite, setEditFavorite] = useState(props.reviewToUpdate.result);
  const [editWatched, setEditWatched] = useState(props.reviewToUpdate.result);

  const reviewUpdate = (e, review) => {
    e.preventDefault();
    fetch(`http://localhost:3000/review/${props.reviewToUpdate.id}`, {
      method: "PUT",
      body: JSON.stringify({
        review: editReview,
        rating: editRating,
        favorite: editFavorite,
        watched: editWatched,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        // Authorization: `Bearer ${props.token}`,
      }),
    })
      .then((res) => {
        props.fetchReview();
        props.updateOff();
      })
      .catch((err) => console.log(err));
  };

  return (
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
  );
};

export default ReviewEdit;
