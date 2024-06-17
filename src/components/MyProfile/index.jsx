import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function Myprofile() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  console.log(user);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/admin/user/663f45ea96591df7c926c371`
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

    fetchUser();
  }, [userId]);

  if (!user) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  return (
    <>
      <div>
        <h2>My profile</h2>
        <p>{`Name: ${user.first_name} ${user.last_name}`}</p>
        <p>{`Location: ${user.location}`}</p>
        <p>{`Description: ${user.description}`}</p>
        <p>{`Occupation: ${user.occupation}`}</p>
      </div>
    </>
  );
}

export default Myprofile;
