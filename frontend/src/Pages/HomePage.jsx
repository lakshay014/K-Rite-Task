import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Stack, Typography } from "@mui/material";

import { useUser } from "../Contexts/userContext";

import NewPost from "../Components/NewPost";
import PostDisplay from "../Components/PostDisplay";
import axios from "axios";

const HomePage = () => {
  const navigate = useNavigate();
  const { token, user } = useUser();

  // =========================================================================================== USE STATE
  const [posts, setPosts] = useState([]);
  // =========================================================================================== USE EFFECT
  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    const readPosts = async () => {
      try {
        const response = await axios.get("/api/post/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response) {
          setPosts(response.data);
          return response;
        }
      } catch (error) {
        console.log(error); // Debug Log
      }
    };
    readPosts();
  }, [token]);

  return (
    <Container sx={{ py: 5 }} maxWidth="md">
      <Stack spacing={1}>
        <NewPost setPosts={setPosts} />
        {posts.length ? (
          posts.map((post) => (
            <PostDisplay
              key={post._id}
              postId={post._id}
              coverPicture={post.coverPicture}
              caption={post.caption}
              author={post.author}
              comments={post.comments}
            />
          ))
        ) : (
          <Typography variant="caption" textAlign={"center"}>
            Trying to fetch the posts
          </Typography>
        )}
      </Stack>
    </Container>
  );
};

export default HomePage;
