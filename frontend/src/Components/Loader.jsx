import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import { useLoading } from "../Contexts/loadingContext";

export default function SimpleBackdrop() {
  const { openLoading } = useLoading();

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={openLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
