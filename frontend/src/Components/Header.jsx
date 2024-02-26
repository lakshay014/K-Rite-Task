import {
  AppBar,
  Box,
  Container,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";

import Diversity1Icon from "@mui/icons-material/Diversity1";

import Menu from "./Menu";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" elevation={3}>
        <Container disableGutters>
          <Toolbar>
            <IconButton
              color="secondary"
              size="large"
              onClick={() => window.scrollTo(0, 0)}
            >
              <Diversity1Icon fontSize="inherit" />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              sx={{
                ml: 2,
                color: "secondary",
                fontWeight: 700,
              }}
            >
              K-Rite Social
            </Typography>
            <div style={{ flexGrow: "1" }}></div>
            <Menu />
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </Box>
  );
}
