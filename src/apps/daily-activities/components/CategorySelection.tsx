import { VStack, Heading, Text, Grid, Box, Flex } from "@chakra-ui/react";
import { useTheme } from "~/contexts/ThemeContext";
import { QuestionCategory, CategoryInfo } from "../types";
import { categories } from "../data";

type CategorySelectionProps = {
  onSelectCategory: (category: QuestionCategory) => void;
};

export const CategorySelection = ({ onSelectCategory }: CategorySelectionProps) => {
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
            borderWidth="2px"
            borderColor={isDarkMode ? "gray.700" : "gray.200"}
            _hover={{
              borderColor: colorMap[category.color],
              transform: "translateY(-4px)",
              boxShadow: "lg",
            }}
            cursor="pointer"
            transition="all 0.2s"
            onClick={() => onSelectCategory(category.id)}
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

