import { Box, Typography, CardMedia, Paper, Button } from "@mui/material";
import { useCountries } from "../context/CountriesContext";
import { useAuthorities } from "../context/AuthoritiesContext";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function CountriesPage() {
  const navigate = useNavigate();
  const { cca3 } = useParams();
  const { countries, selectedCountry, selectCountry } = useCountries();
  const { authorities } = useAuthorities();

  const countryAuthorities = selectedCountry
    ? authorities[selectedCountry.cca3] || []
    : [];

  useEffect(() => {
    if (cca3 && countries.length) {
      const found = countries.find((c) => c.cca3 === cca3);
      if (found) selectCountry(found);
    }
  }, [cca3, countries]);

  return (
    <Box sx={{ flex: 1, p: 3, overflowY: "auto" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "left",
          alignItems: "center",
          gap: 2,
        }}
      >
        {!selectedCountry ? (
          <Typography variant="h6">Selecione um país na sidebar</Typography>
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 15,
              }}
            >
              <Typography variant="h4" sx={{ mb: 2 }}>
                {selectedCountry.name.common}
              </Typography>

              <CardMedia
                component="img"
                image={selectedCountry.flags.png}
                alt={selectedCountry.flags.alt}
                sx={{ width: 60, objectFit: "contain", borderRadius: 1 }}
              />
            </Box>

            <Box>
              <Typography>
                <strong>Capital:</strong>{" "}
                {selectedCountry.capital?.[0] || "N/A"}
              </Typography>

              <Typography>
                <strong>Region:</strong> {selectedCountry.region}
              </Typography>

              <Typography>
                <strong>Language:</strong>{" "}
                {selectedCountry.languages
                  ? Object.values(selectedCountry.languages)[0]
                  : "N/A"}
              </Typography>

              <Typography>
                <strong>TLD:</strong> {selectedCountry.tld?.[0]}
              </Typography>
            </Box>

            <Box sx={{ m: 2, maxWidth: "300px" }}>
              <Button
                variant="contained"
                onClick={() =>
                  navigate(
                    `/authority/register?country=${selectedCountry.cca3}`
                  )
                }
              >
                Cadastrar nova autoridade
              </Button>
            </Box>

            <Paper sx={{ p: 2, maxWidth: "700px" }}>
              <Typography variant="h6" mb={1}>
                Autoridades cadastradas:
              </Typography>
              <Box
                sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
              >
                {countryAuthorities.length === 0 ? (
                  <Typography>Nenhuma autoridade cadastrada ainda.</Typography>
                ) : (
                  countryAuthorities.map((auth, i) => (
                    <Paper key={i} sx={{ p: 2, mb: 2, maxWidth: "400px" }}>
                      <Typography variant="subtitle1">{auth.name}</Typography>
                      <Typography>Cargo: {auth.role}</Typography>
                      <Typography>Email: {auth.email}</Typography>
                    </Paper>
                  ))
                )}
              </Box>
            </Paper>
          </>
        )}
      </Box>
    </Box>
  );
}
