import { Box } from '@chakra-ui/react';
import SystemThemeToggle from '../../components/SystemThemeToggle';
import { Navbar } from './Navbar';
import { PublicListings } from './PublicListings';

export const LandingPage = () => {
  return (
    <Box>
      <Navbar />
      <SystemThemeToggle />
      <PublicListings />
    </Box>
  );
};
