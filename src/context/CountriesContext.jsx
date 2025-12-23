import { createContext, useContext, useState, useEffect, useMemo } from "react";
import useFetch from "../hooks/useFetch";

const CountriesContext = createContext();

export function CountriesProvider({ children }) {
  const { data, loading, error } = useFetch(
    "https://restcountries.com/v3.1/all?fields=cca3,name,flags,capital,region,languages,tld",
    { cacheKey: "Countrydata" }
  );
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setCountries(data);
    }
  }, [data]);

  const [selectedCountry, setSelectedCountry] = useState(() => {
    const cached = localStorage.getItem("selectedCountry");
    return cached ? JSON.parse(cached) : null;
  });

  const selectCountry = (country) => {
    setSelectedCountry(country);
    localStorage.setItem("selectedCountry", JSON.stringify(country));
  };

  const availableRegions = useMemo(() => {
    if (!countries.length) return [];
    const regions = [...new Set(countries.map((c) => c.region))];
    return regions.filter(Boolean).sort();
  }, [countries]);

  const [selectedRegions, setSelectedRegions] = useState([]);
  const [searchCountryName, setSearchCountryName] = useState("");

  const filteredCountries = useMemo(() => {
    if (!countries.length) return [];

    const sorted = [...countries].sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );

    let result = sorted;

    const hasRegionFilter = selectedRegions.length > 0;
    const hasSearch = searchCountryName.trim() !== "";
    const countryName = searchCountryName.trim().toLowerCase();

    if (hasRegionFilter) {
      result = result.filter((c) => selectedRegions.includes(c.region));
    }

    if (hasSearch) {
      result = result.filter((c) =>
        c.name.common.toLowerCase().includes(countryName)
      );
    }

    if (!hasRegionFilter && !hasSearch) {
      return sorted.slice(0, 25);
    }

    return result;
  }, [countries, selectedRegions, searchCountryName]);

  return (
    <CountriesContext.Provider
      value={{
        loading,
        error,
        countries,
        filteredCountries,
        availableRegions,
        selectedCountry,
        selectCountry,
        selectedRegions,
        setSelectedRegions,
        searchCountryName,
        setSearchCountryName,
      }}
    >
      {children}
    </CountriesContext.Provider>
  );
}

export function useCountries() {
  return useContext(CountriesContext);
}
