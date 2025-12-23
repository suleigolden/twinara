import { VStack, Heading, Text, Grid, Box, Flex } from "@chakra-ui/react";
import { useTheme } from "~/contexts/ThemeContext";
import { QuestionCategory, CategoryInfo } from "../types";


export const categories: CategoryInfo[] = [
  {
    id: "identity-self-recall",
    title: "Identity & Self Recall",
    icon: "👤",
    description: "Reinforce sense of self",
    color: "purple",
  },
  {
    id: "people-relationships",
    title: "People & Relationships",
    icon: "❤️",
    description: "Reinforce family and social bonds",
    color: "pink",
  },
  {
    id: "routine-daily-awareness",
    title: "Routine & Daily Awareness",
    icon: "⏰",
    description: "Reduce confusion about time and plans",
    color: "blue",
  },
  {
    id: "recognition-based",
    title: "Recognition Tasks",
    icon: "✅",
    description: "Easy recognition questions",
    color: "green",
  },
  {
    id: "story-memory",
    title: "Story & Memory",
    icon: "📖",
    description: "Strengthen narrative memory",
    color: "orange",
  },
  {
    id: "behavioral-prompts",
    title: "Wellness Prompts",
    icon: "💬",
    description: "Encourage healthy habits",
    color: "teal",
  },
];

type CategorySelectionProps = {
  onSelectCategory: (category: QuestionCategory) => void;
  disabled?: boolean;
};

export const CategorySelection = ({ onSelectCategory, disabled = false }: CategorySelectionProps) => {
  const { isDarkMode } = useTheme();

  const colorMap: Record<string, string> = {
    purple: isDarkMode ? "purple.600" : "purple.500",
    pink: isDarkMode ? "pink.600" : "pink.500",
    blue: isDarkMode ? "blue.600" : "blue.500",
    green: isDarkMode ? "green.600" : "green.500",
    orange: isDarkMode ? "orange.600" : "orange.500",
    teal: isDarkMode ? "teal.600" : "teal.500",
  };

  return (
    <VStack spacing={8} align="center" py={12}>
      <VStack spacing={4} textAlign="center">
        <Heading
          size="2xl"
          color={isDarkMode ? "white" : "gray.800"}
          fontWeight="bold"
        >
          Choose Your Activity
        </Heading>
        <Text
          fontSize="lg"
          color={isDarkMode ? "gray.400" : "gray.600"}
          maxW="600px"
        >
          All Twinara tasks are generated from your personal data and designed to support different aspects of memory and cognition
        </Text>
      </VStack>

      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
        gap={6}
        w="full"
      >
        {categories.map((category, index) => (
          <Box
            key={category.id}
            p={6}
            borderRadius="xl"
            bg={isDarkMode ? "gray.800" : "white"}
            borderColor={isDarkMode ? "gray.700" : "gray.200"}
            _hover={{
              borderColor: colorMap[category.color],
              borderWidth: "2px",
              transform: "translateY(-4px)",
              boxShadow: "lg",
            }}
            cursor={disabled ? "not-allowed" : "pointer"}
            opacity={disabled ? 0.6 : 1}
            transition="all 0.2s"
            onClick={() => !disabled && onSelectCategory(category.id)}
            boxShadow="md"
          >
            <VStack spacing={4} align="start">
              <Flex
                align="center"
                justify="center"
                w={12}
                h={12}
                borderRadius="full"
                bg={`${category.color}.100`}
                color={colorMap[category.color]}
              >
                <Text fontSize="2xl">{category.icon}</Text>
              </Flex>
              <VStack align="start" spacing={1}>
                <Heading
                  size="md"
                  color={isDarkMode ? "white" : "gray.800"}
                  fontWeight="bold"
                >
                  {category.title}
                </Heading>
                <Text
                  fontSize="sm"
                  color={isDarkMode ? "gray.400" : "gray.600"}
                >
                  {category.description}
                </Text>
              </VStack>
            </VStack>
          </Box>
        ))}
      </Grid>
    </VStack>
  );
};

