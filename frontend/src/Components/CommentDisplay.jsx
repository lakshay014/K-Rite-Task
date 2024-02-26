import { Avatar, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

const CommentDisplay = ({ comment, author }) => {
  return (
    <Stack sx={{ my: 1 }}>
      <Stack direction={"row"} spacing={1} alignItems={"center"}>
        <Avatar src={author.profilePicture} sx={{ height: 24, width: 24 }} />
        <Typography variant="subtitle2">{author.name}</Typography>
      </Stack>
      <Typography variant="caption" sx={{ px: "32px" }}>
        {comment}
      </Typography>
    </Stack>
  );
};

CommentDisplay.propTypes = {
  comment: PropTypes.string.isRequired,
  author: PropTypes.shape({
    name: PropTypes.string,
    profilePicture: PropTypes.string,
    username: PropTypes.string,
  }).isRequired,
};

export default CommentDisplay;
