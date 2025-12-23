import { createContext, useContext, useState } from "react";

const AuthoritiesContext = createContext();

export function AuthoritiesProvider({ children }) {
  const [authorities, setAuthorities] = useState(() => {
    const saved = localStorage.getItem("authorities");
    return saved ? JSON.parse(saved) : {};
  });

  function addAuthority(countryCode, authority) {
    setAuthorities((prev) => {
      const updated = {
        ...prev,
        [countryCode]: [...(prev[countryCode] || []), authority],
      };
      localStorage.setItem("authorities", JSON.stringify(updated));
      return updated;
    });
  }

  function hasAuthorityInRole(countryCode, role) {
    return authorities[countryCode]?.some((a) => a.role === role);
  }

  return (
    <AuthoritiesContext.Provider
      value={{
        authorities,
        addAuthority,
        hasAuthorityInRole,
      }}
    >
      {children}
    </AuthoritiesContext.Provider>
  );
}

export function useAuthorities() {
  return useContext(AuthoritiesContext);
}
