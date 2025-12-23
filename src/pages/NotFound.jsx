import { Box, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <Box p={4}>
      <Typography variant="h3" color="error">
        404 - Página não encontrada
      </Typography>
    </Box>
  );
}
