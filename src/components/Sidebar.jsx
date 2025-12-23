import { useState, useMemo } from "react";
import { useCountries } from "../context/CountriesContext";
import {
  Box,
  CircularProgress,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const {
    loading,
    error,
    filteredCountries,
    selectedCountry,
    selectCountry,
    availableRegions,
    selectedRegions,
    setSelectedRegions,
    searchCountryName,
    setSearchCountryName,
  } = useCountries();

  function toggleRegion(region) {
    if (selectedRegions.includes(region)) {
      setSelectedRegions(selectedRegions.filter((r) => r !== region));
    } else {
      setSelectedRegions([...selectedRegions, region]);
    }
  }

  if (loading)
    return (
      <Box p={4} display="flex" gap={2} alignItems="center">
        <CircularProgress />
        <Typography>Carregando países...</Typography>
      </Box>
    );

  if (error)
    return (
      <Box p={4}>
        <Typography color="error">Erro ao carregar dados: {error}</Typography>
      </Box>
    );

  return (
    <Box display="flex" minHeight="100vh">
      <Box
        sx={{
          width: 240,
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 56,
          overflowY: "auto",
          background: "#f7f7f7",
          borderRight: "1px solid #ddd",
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, p: 2 }}>
          Países:
        </Typography>

        <TextField
          label="Buscar país..."
          variant="outlined"
          size="small"
          value={searchCountryName}
          onChange={(e) => setSearchCountryName(e.target.value)}
          sx={{ m: 2 }}
        />

        <FormGroup sx={{ m: 2 }}>
          {availableRegions.map((region) => (
            <FormControlLabel
              key={region}
              control={
                <Checkbox
                  checked={selectedRegions.includes(region)}
                  onChange={() => toggleRegion(region)}
                />
              }
              label={region.toUpperCase()}
              sx={{ "& .MuiSvgIcon-root": { fontSize: 20 } }}
            />
          ))}
        </FormGroup>

        <List>
          {filteredCountries.map((country) => {
            const isSelected = selectedCountry?.cca3 === country.cca3; // caa3: código de 3 letras padronizado (BRA, USA, FRA...)

            return (
              <ListItemButton
                key={country.cca3}
                onClick={() => {
                  selectCountry(country);
                  navigate(`/countries/${country.cca3}`);
                }}
                selected={isSelected}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "primary.main",
                    color: "white",
                  },
                  "&.Mui-selected:hover": {
                    backgroundColor: "primary.dark",
                  },
                }}
              >
                <ListItemText
                  primary={country.name.common}
                  sx={{ fontStyle: "italic" }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>
    </Box>
  );
}
