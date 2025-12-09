import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { LandingPage } from "./apps/landing-page";
import { theme } from "./theme/theme";
import { initAxios } from "@suleigolden/co-renting-api-client";
import { DashboardNavBar } from "./layouts/admin";
import { useState } from "react";
import { OnboardComplete } from "./apps/listings/OnboardComplete";
import { PublicListingsDetails } from "./apps/landing-page/PublicListingsDetails";

function App() {
  const [currentTheme, setCurrentTheme] = useState(theme);
  initAxios(import.meta.env.VITE_API_BASE_URL || "");
  return (
    <ChakraProvider theme={currentTheme}>
      <Router>
        <Routes>
          {/* PublicRoutes */}
          <Route>
            <Route path="/" element={<LandingPage />} />
          </Route>
          <Route
            path="user/*"
            element={
              <DashboardNavBar
                theme={currentTheme}
                setTheme={setCurrentTheme}
              />
            }
          />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
