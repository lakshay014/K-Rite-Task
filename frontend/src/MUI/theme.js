import { createTheme } from "@mui/material";

export const theme = createTheme({
  shape: {
    borderRadius: 10,
  },
  palette: {
    primary: {
      main: "#3D3C42",
      light: "#636367",
      dark: "#2a2a2e",
    },
    secondary: {
      main: "#7F5283",
      light: "#98749b",
      dark: "#58395b",
    },
    background: {
      paper: "#FEFBF6",
    },
  },
  typography: {
    fontFamily: "'Quicksand','Roboto','Helvetica','Arial',sans-serif",
    h2: {
      fontWeight: 500,
    },
    button: {
      textTransform: "none",
    },
  },
});
