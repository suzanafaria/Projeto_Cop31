import { useCountries } from "../context/CountriesContext";
import { useAuthorities } from "../context/AuthoritiesContext";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function Authorities() {
  const { countries } = useCountries();
  const { authorities } = useAuthorities();

  const allAuthorities = Object.entries(authorities).flatMap(([cca3, list]) => {
    const country = countries.find((c) => c.cca3 === cca3);
    return list.map((auth) => ({
      ...auth,
      countryName: country?.name.common || cca3,
    }));
  });

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Todas as Autoridades Cadastradas
      </Typography>

      {allAuthorities.length === 0 ? (
        <Typography>Nenhuma autoridade cadastrada.</Typography>
      ) : (
        <Paper sx={{ p: 2 }}>
          <List>
            {allAuthorities.map((auth, idx) => (
              <ListItem key={idx}>
                <ListItemText
                  primary={`${auth.name} — ${auth.role}`}
                  secondary={`${auth.email} • ${auth.countryName}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}
