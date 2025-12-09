import { Box } from "@chakra-ui/react";
import SystemThemeToggle from "~/components/SystemThemeToggle";
import { Navbar } from "./Navbar";
import { ListingsDetails } from "../listings/details/ListingsDetails";

export const PublicListingsDetails = () => {
    return (
      <Box>
        <Navbar />
        <SystemThemeToggle />
        <ListingsDetails />
      </Box>
    );
  };
  
