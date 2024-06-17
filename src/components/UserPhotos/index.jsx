import React, { useState, useEffect } from "react";
import { Typography, Button, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import PhotoUpload from "../PhotoUpload";

function UserPhotos() {
  const { userId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);
  const [commentVisible, setCommentVisible] = useState(null);
  const [newComment, setNewComment] = useState("");

  const fetchPhotos = async () => {
    try {
      const response = await fetch(
        `http://localhost:8081/admin/photo/photosOfUser/${userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch photos");
      }
      const photoData = await response.json();
      setPhotos(photoData);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/admin/user/${userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchPhotos();
    fetchUser();
  }); 
  // [userId]);

  const handlePhotoUploaded = () => {
    fetchPhotos();
  };

  const handleAddCommentClick = (photoId) => {
    setCommentVisible(photoId);
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async (photoId) => {
    try {
      const response = await fetch(
        `http://localhost:8081/admin/photo/addComment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            photo_id: photoId,
            comment: newComment,
            user_id: userId, 
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add comment");
      }
      const addedComment = await response.json();
      setPhotos((prevPhotos) =>
        prevPhotos.map((photo) =>
          photo._id === photoId
            ? { ...photo, comments: [...photo.comments, addedComment] }
            : photo
        )
      );
      setNewComment("");
      setCommentVisible(null);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleCloseComment = () => {
    setCommentVisible(null);
  };

  if (!user) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  if (!photos || photos.length === 0) {
    return (
      <div>
        <Typography variant="h5">No photos found for this user</Typography>
        <PhotoUpload userId={userId} onPhotoUploaded={handlePhotoUploaded} />
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h5">
        UserPhotos of {user.first_name} {user.last_name} 
      </Typography>
      <PhotoUpload userId={userId} onPhotoUploaded={handlePhotoUploaded} />
      {photos.map((photo) => (
        <div key={photo._id}>
          <img
            src={`${photo.file_name}`}
            alt={`Photo ${photo._id}`}
            style={{ maxWidth: "200px", marginTop: "5px" }}
          />
          <Typography variant="body1">
            Created At: {new Date(photo.date_time).toLocaleString()}
          </Typography>

          {/* Comments */}
          <Typography variant="body1">Comments:</Typography>
          <ul>
            {photo.comments.map((comment) => (
              <li key={comment._id}>
                <Typography variant="body1">
                  {user.first_name} {user.last_name}
                </Typography>
                <Typography variant="body2">
                  {comment.user} -{" "}
                  {new Date(comment.date_time).toLocaleString()}:
                </Typography>
                <Typography variant="body2">{comment.comment}</Typography>
              </li>
            ))}
          </ul>
          <Button
            variant="contained"
            color="primary"
            style={{
              fontSize: "10px",
              padding: "5px 10px",
              marginBottom: "15px",
            }}
            onClick={() => handleAddCommentClick(photo._id)}
          >
            Add Comment
          </Button>
          {commentVisible === photo._id && (
            <div>
              <TextField
                label="New Comment"
                value={newComment}
                onChange={handleCommentChange}
                multiline
                rows={2}
                variant="outlined"
                fullWidth
              />
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleCommentSubmit(photo._id)}
                style={{
                  fontSize: "10px",
                  padding: "5px 5px",
                  marginTop: "5px",
                }}
              >
                Add
              </Button>
              <Button onClick={handleCloseComment}>Close</Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default UserPhotos;
