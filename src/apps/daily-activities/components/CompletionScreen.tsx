import { VStack, HStack, Text, Button, Box, Heading, Icon, Flex } from "@chakra-ui/react";
import { FaFire, FaTrophy, FaCheckCircle } from "react-icons/fa";
import { useTheme } from "~/contexts/ThemeContext";
import { GameState } from "../types";

type CompletionScreenProps = {
  gameState: GameState;
  onContinue: () => void;
  onReview: () => void;
};

export const CompletionScreen = ({
  gameState,
  onContinue,
  onReview,
}: CompletionScreenProps) => {
  const { isDarkMode } = useTheme();

  const getAccuracyColor = () => {
    if (gameState.accuracy >= 80) return "green";
    if (gameState.accuracy >= 60) return "yellow";
    return "orange";
  };

  const getAccuracyLabel = () => {
    if (gameState.accuracy >= 80) return "Excellent!";
    if (gameState.accuracy >= 60) return "Good!";
    return "Keep Practicing!";
  };

  return (
    <VStack spacing={8} align="center" py={12}>
      {/* Celebration Icon */}
      <Box
        p={8}
        borderRadius="full"
        bg={isDarkMode ? "green.900" : "green.100"}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Icon as={FaTrophy} boxSize={16} color="green.500" />
      </Box>

      {/* Title */}
      <Heading
        size="2xl"
        color={isDarkMode ? "white" : "gray.800"}
        fontWeight="bold"
        textAlign="center"
      >
        Lesson Complete! 🎉
      </Heading>

      {/* Stats Cards */}
      <HStack spacing={6} w="full" maxW="600px" justify="center">
        {/* Total XP */}
        <Box
          flex={1}
          p={6}
          borderRadius="xl"
          bg={isDarkMode ? "yellow.900" : "yellow.100"}
          textAlign="center"
          boxShadow="lg"
        >
          <VStack spacing={2}>
            <Icon as={FaFire} boxSize={6} color="yellow.600" />
            <Text
              fontSize="xs"
              fontWeight="bold"
              color={isDarkMode ? "yellow.200" : "yellow.700"}
              textTransform="uppercase"
            >
              Total XP
            </Text>
            <Text
              fontSize="3xl"
              fontWeight="bold"
              color={isDarkMode ? "white" : "gray.800"}
            >
              {gameState.totalXP}
            </Text>
          </VStack>
        </Box>

        {/* Accuracy */}
        <Box
          flex={1}
          p={6}
          borderRadius="xl"
          bg={isDarkMode ? `${getAccuracyColor()}.900` : `${getAccuracyColor()}.100`}
          textAlign="center"
          boxShadow="lg"
        >
          <VStack spacing={2}>
            <Icon as={FaCheckCircle} boxSize={6} color={`${getAccuracyColor()}.600`} />
            <Text
              fontSize="xs"
              fontWeight="bold"
              color={isDarkMode ? `${getAccuracyColor()}.200` : `${getAccuracyColor()}.700`}
              textTransform="uppercase"
            >
              {getAccuracyLabel()}
            </Text>
            <Text
              fontSize="3xl"
              fontWeight="bold"
              color={isDarkMode ? "white" : "gray.800"}
            >
              {gameState.accuracy}%
            </Text>
          </VStack>
        </Box>
      </HStack>

      {/* Action Buttons */}
      <VStack spacing={4} w="full" maxW="400px" pt={4}>
        <Button
          colorScheme="green"
          size="lg"
          w="full"
          onClick={onContinue}
          fontSize="md"
          py={6}
          borderRadius="xl"
        >
          Continue
        </Button>
        <Button
          variant="outline"
          size="lg"
          w="full"
          onClick={onReview}
          fontSize="md"
          py={6}
          borderRadius="xl"
          borderColor={isDarkMode ? "gray.600" : "gray.300"}
          color={isDarkMode ? "white" : "gray.800"}
          _hover={{
            bg: isDarkMode ? "gray.700" : "gray.50",
          }}
        >
          Review Lesson
        </Button>
      </VStack>
    </VStack>
  );
};

