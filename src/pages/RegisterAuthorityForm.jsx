import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCountries } from "../context/CountriesContext";
import { useAuthorities } from "../context/AuthoritiesContext";

import {
  Box,
  TextField,
  Typography,
  Button,
  MenuItem,
  Alert,
} from "@mui/material";

const ROLES = [
  "Chefe de Estado",
  "Ministro de Relações Exteriores / Secretário de Estado",
  "Ministro de Meio Ambiente",
];

export default function RegisterAuthorityForm() {
  const { countries } = useCountries();
  const { addAuthority, hasAuthorityInRole } = useAuthorities();

  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const selectedCountry = useMemo(
    () => countries.find((c) => c.cca3 === countryCode),
    [countries, countryCode]
  );

  function validateName(fullname) {
    return fullname.trim().split(" ").length >= 2;
  }

  function validateEmail(email, country) {
    if (!country || !country.tld?.length) return false;

    const domain = country.tld[0].replace(".", "");
    return email.endsWith(`.${domain}`);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!validateName(name)) {
      setError("O nome deve ser completo.");
      return;
    }

    if (hasAuthorityInRole(countryCode, role)) {
      setError(
        "Este país já possui uma autoridade cadastrada para esse cargo."
      );
      return;
    }

    if (!validateEmail(email, selectedCountry)) {
      setError(
        `O email deve terminar com o domínio correto: ${selectedCountry.tld[0]}`
      );
      return;
    }

    addAuthority(countryCode, { name, role, email });

    navigate(`/countries/${countryCode}`);
  }

  return (
    <Box maxWidth={500} mx="auto" mt={4}>
      <Typography variant="h5" mb={3}>
        Cadastrar Autoridade
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="Nome completo"
          required
          fullWidth
          sx={{ mb: 2 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          select
          label="País representado"
          required
          fullWidth
          sx={{ mb: 2 }}
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
        >
          {countries.map((c) => (
            <MenuItem key={c.cca3} value={c.cca3}>
              {c.name.common}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Cargo / Função"
          required
          fullWidth
          sx={{ mb: 2 }}
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          {ROLES.map((r) => (
            <MenuItem key={r} value={r}>
              {r}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Email institucional"
          required
          fullWidth
          sx={{ mb: 3 }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          helperText={
            selectedCountry?.tld
              ? `O email deve terminar com: ${selectedCountry.tld[0]}`
              : ""
          }
        />

        <Button type="submit" variant="contained" fullWidth>
          Cadastrar
        </Button>
      </form>
    </Box>
  );
}
