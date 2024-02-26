import PropTypes from "prop-types";
import { useState } from "react";

import { Paper, Typography } from "@mui/material";

import CommentBox from "./CommentBox";
import CommentDisplay from "./CommentDisplay";

const PostDisplay = ({ postId, coverPicture, caption, author, comments }) => {
  const [postComments, setPostComments] = useState(comments);

  return (
    <Paper sx={{ p: 1 }} variant="outlined">
      <img src={coverPicture} alt="coverPicture" width={"100%"} />
      <Typography variant="subtitle2" display={"inline"}>
        {author.name}
      </Typography>
      <Typography variant="caption"> [ {author.username} ]</Typography>
      <Typography variant="caption" display={"block"} sx={{ py: 2 }}>
        {caption}
      </Typography>
      <Paper
        variant="outlined"
        square
        sx={{
          p: 1,
          my: 1,
          maxHeight: "150px",
          overflowX: "hidden",
          overflowY: "scroll",
        }}
      >
        {postComments.length ? (
          postComments.map((comment, index) => (
            <CommentDisplay
              key={comment._id}
              comment={comment.comment}
              author={comment.author}
            />
          ))
        ) : (
          <Typography variant="caption">Leave a comment</Typography>
        )}
      </Paper>

      <CommentBox postId={postId} setPostComments={setPostComments} />
    </Paper>
  );
};

// Component Prop Types

PostDisplay.propTypes = {
  postId: PropTypes.string.isRequired,
  coverPicture: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  author: PropTypes.shape({
    name: PropTypes.string,
    profilePicture: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
  comments: PropTypes.array.isRequired,
};

export default PostDisplay;
