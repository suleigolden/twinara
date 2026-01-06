import {
    Container,
    VStack,
    Box,
    Heading,
    Text,
    Button,
    HStack,
    Icon,
  } from "@chakra-ui/react";
  import { useNavigate } from "react-router-dom";
  import { useDementiaUserProfile } from "~/hooks/use-dementia-user-profile";
  import { useUser } from "~/hooks/use-user";
  import { FaUser, FaArrowRight } from "react-icons/fa";
import { TwinaraAI } from "../twinara-ai/TwinaraAI";
  
  export const Dashboard = () => {
    const { dementiaUserProfile, isLoading } = useDementiaUserProfile();
    const { user } = useUser();
    const navigate = useNavigate();
  
    const isProfileComplete = () => {
      if (!dementiaUserProfile) return false;
  
    const hasBasicInfo =
      dementiaUserProfile.avatarUrl &&
        dementiaUserProfile.firstName &&
        dementiaUserProfile.lastName &&
        dementiaUserProfile.phoneNumber &&
        dementiaUserProfile.dob &&
        dementiaUserProfile.gender;
  
    const hasCompleteAddress =
        dementiaUserProfile.address &&
      dementiaUserProfile.address.street &&
      dementiaUserProfile.address.city &&
      dementiaUserProfile.address.state &&
      dementiaUserProfile.address.country &&
      dementiaUserProfile.address.postal_code;

    const hasBio = dementiaUserProfile.bio && dementiaUserProfile.bio.trim().length > 0;
  
    return !!(hasBasicInfo && hasCompleteAddress && hasBio);
    };
  
    const handleGoToProfileSettings = () => {
      if (user?.id) {
        navigate(`/user/${user.id}/dementia-user/onboarding`);
      }
    };
  
    if (isLoading) {
      return (
        <Container maxW="1500px" px={[4, 8]} py={8}>
          <VStack align="start" spacing={8} w="full" mt={10}>
            <Text>Loading...</Text>
          </VStack>
        </Container>
      );
    }
  
    if (!isProfileComplete()) {
      return (
        <Container maxW="1500px" px={[4, 8]} py={8}>
          <VStack align="start" spacing={8} w="full" mt={10}>
            <Box
              w="full"
              maxW="720px"
              bg="white"
              borderRadius="2xl"
              boxShadow="lg"
              p={{ base: 6, sm: 8, md: 10 }}
            >
              <VStack spacing={6} align="start">
                <HStack spacing={4}>
                  <Box
                    p={3}
                    bg="brand.50"
                    borderRadius="full"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Icon as={FaUser} color="brand.500" boxSize={6} />
                  </Box>
                  <Heading size="lg" color="gray.800">
                    Complete Your Profile
                  </Heading>
                </HStack>
  
                <Text fontSize="md" color="gray.600" lineHeight="tall">
                  To get the best support and assistance from Twinara, please complete your profile. The more information you provide, the better we can help guide and support you with your daily activities and routines.
                </Text>
  
                <Box
                  bg="blue.50"
                  borderLeft="4px solid"
                  borderColor="blue.500"
                  p={4}
                  borderRadius="md"
                  w="full"
                >
                  <VStack align="start" spacing={2} pl={2}>
                    <Text fontSize="sm" color="blue.900" fontWeight="medium">
                      Required Information:
                    </Text>
                    <VStack align="start" spacing={1} pl={4}>
                      <Text fontSize="sm" color="blue.800">
                        • Profile Photo
                      </Text>
                      <Text fontSize="sm" color="blue.800">
                        • First Name and Last Name
                      </Text>
                      <Text fontSize="sm" color="blue.800">
                        • Date of Birth
                      </Text>
                      <Text fontSize="sm" color="blue.800">
                        • Gender
                      </Text>
                      <Text fontSize="sm" color="blue.800">
                        • Phone Number (Emergency Contact)
                      </Text>
                      <Text fontSize="sm" color="blue.800">
                        • Complete Address (Street, City, State, Country, Postal Code)
                      </Text>
                      <Text fontSize="sm" color="blue.800">
                        • Biography and Additional Information
                      </Text>
                    </VStack>
                  </VStack>
                </Box>
  
                <Button
                  colorScheme="brand"
                  size="lg"
                  rightIcon={<Icon as={FaArrowRight} />}
                  onClick={handleGoToProfileSettings}
                  w={{ base: "full", sm: "auto" }}
                >
                  Complete Your Profile
                </Button>
              </VStack>
            </Box>
          </VStack>
        </Container>
      );
    }
  
    return (
      <Container maxW="1500px" px={[4, 8]} py={8}>
        <VStack align="start" spacing={8} w="full" mt={10}>
          <TwinaraAI />
        </VStack>
      </Container>
    );
  };
  