import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      sx={{
        left: "240px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Toolbar sx={{ minHeight: "64px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItens: "center",
            displayFlex: 1,
          }}
        >
          <Button color="inherit" onClick={() => navigate("/agenda")}>
            Agenda
          </Button>
          <Button color="inherit" onClick={() => navigate("/countries")}>
            Countries
          </Button>
          <Button color="inherit" onClick={() => navigate("/authorities")}>
            Authorities
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
