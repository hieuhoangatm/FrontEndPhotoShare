import React, { useState, useEffect } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  Button,
  Box,
  Grid,
} from "@mui/material";

import "./styles.css";
import { Link } from "react-router-dom";


function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "http://localhost:8081/admin/user/list"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user list");
        }
        const userData = await response.json();
        setUsers(userData);
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <List component="nav">
        {users.map((item) => (
          <>
            <ListItem key={item._id}>
              <Link to={`/users/${item._id}`}>{` ${item.last_name}`}</Link>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </div>
  );
}

export default UserList;
