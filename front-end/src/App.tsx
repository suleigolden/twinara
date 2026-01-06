import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { LandingPage } from "./apps/landing-page/pages";
import { theme } from "./theme/theme";
import { DashboardNavBar } from "./layouts/admin";
import { useState } from "react";
import About from "./apps/landing-page/pages/About";

function App() {
  const [currentTheme, setCurrentTheme] = useState(theme);
  return (
    <ChakraProvider theme={currentTheme}>
      <Router>
        <Routes>
          {/* PublicRoutes */}
          <Route>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<About />} />
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
          <Route
            path="dementia-user/*"
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
