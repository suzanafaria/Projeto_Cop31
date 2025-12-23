import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%",
        height: 56,
        background: "#eaeaea",
        borderTop: "1px solid #ccc",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1300,
      }}
    >
      <Typography variant="body2">COP31 Organizer — 2025</Typography>
    </Box>
  );
}
