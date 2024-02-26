import PropTypes from "prop-types";

import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { Box, Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

import { useUser } from "../Contexts/userContext";
import { useLoading } from "../Contexts/loadingContext";
import toast from "react-hot-toast";
import axios from "axios";

const CommentBox = ({ postId, setPostComments }) => {
  const { token } = useUser();
  const { openLoading, setOpenLoading } = useLoading();

  const [comment, setComment] = useState("");

  // =========================================================================================== ON SUBMIT
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // Post new comment
    const commentData = {
      id: postId,
      comment: comment,
    };
    const response = await updateComment(commentData);

    if (response) {
      const lastComment = {
        comment: response.comment,
        author: response.author,
        _id: response._id,
      };
      setPostComments((prevState) => [lastComment, ...prevState]);
      toast.success("Comment posted");
      setComment("");
    }
  };

  //------------------------------------------------------------------------------------------- API
  const updateComment = async (commentData) => {
    setOpenLoading(true);
    try {
      const response = await axios.post("/api/post/comment", commentData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        setOpenLoading(false);
        return response.data;
      }
    } catch (error) {
      setOpenLoading(false);
      console.log(error); // Debug Log
    }
  };

  return (
    <Box>
      <form onSubmit={onSubmitHandler}>
        <Stack direction={"row"} spacing={1}>
          <TextField
            label="Comment"
            type="text"
            required
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            multiline
            size="small"
            rows={2}
            fullWidth
          />
          <LoadingButton
            color="secondary"
            variant="contained"
            type="submit"
            loading={openLoading}
            sx={{ my: 1 }}
            disableElevation
          >
            <SendIcon />
          </LoadingButton>
        </Stack>
      </form>
    </Box>
  );
};

// Component Prop Types

CommentBox.propTypes = {
  postId: PropTypes.string.isRequired,
  setPostComments: PropTypes.func.isRequired,
};

export default CommentBox;
