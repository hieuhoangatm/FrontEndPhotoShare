import React, { useState } from "react";
import { Paper, Typography } from "@material-ui/core";
import axios from "axios";
import "./styles.css";

function UploadPhoto(props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const handleUploadButtonClicked = async (e) => {
    e.preventDefault();
    const uploadedPhoto = e.target.elements[0].files[0];
    const userId = props.userId; 

    if (!uploadedPhoto) {
      setErrorMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("photo", uploadedPhoto);
    formData.append("userId", userId); 

    try {
      setErrorMessage("");
      const response = await axios.post(
        "http://localhost:8081/admin/photo/new",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (props.updateAll) {
        props.updateAll();
      }

      if (props.history) {
        props.history.push("/photoDetailView/" + response.data._id);
      }
      
      setUploadSuccess(true);
    } catch (error) {
      console.error(error);
      setErrorMessage(
        error.response?.data?.message || "Error uploading photo."
      );
    }
  };

  return (
    <React.Fragment>
      <Typography>
        <form onSubmit={handleUploadButtonClicked}>
          <input type="file" accept="image/*" />
          <input type="submit" value="Upload!" />
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          {uploadSuccess && (
            <p style={{ color: "green" }}>Photo uploaded successfully!</p>
          )}
        </form>
      </Typography>
    </React.Fragment>
  );
}

export default UploadPhoto;


