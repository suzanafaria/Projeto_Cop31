import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import CountriesPage from "./pages/CountriesPage";
import Authorities from "./pages/Authorities";
import Agenda from "./pages/Agenda";
import NotFound from "./pages/NotFound";
import { CountriesProvider } from "./context/CountriesContext";
import { AuthoritiesProvider } from "./context/AuthoritiesContext";
import RegisterAuthorityForm from "./pages/RegisterAuthorityForm";

export default function App() {
  return (
    <CountriesProvider>
      <AuthoritiesProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route
                path="/authority/register"
                element={<RegisterAuthorityForm />}
              />
              <Route path="/countries" element={<h2>Selecione o país</h2>} />
              <Route path="/countries/:cca3" element={<CountriesPage />} />
              <Route path="/authorities" element={<Authorities />} />
              <Route path="/agenda" element={<Agenda />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </AuthoritiesProvider>
    </CountriesProvider>
  );
}
