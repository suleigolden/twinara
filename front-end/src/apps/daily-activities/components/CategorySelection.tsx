import { VStack, Heading, Text, Grid, Box, Flex } from "@chakra-ui/react";
import { useState } from "react";
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
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

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
            as="button"
            type="button"
            position="relative"
            p={6}
            borderRadius="2xl"
            bg={isDarkMode ? "gray.800" : "white"}
            border="1px solid"
            borderColor={isDarkMode ? "gray.700" : "blue.200"}
            _hover={{
              borderColor: colorMap[category.color],
              transform: "translateY(-8px) scale(1.02)",
              boxShadow: isDarkMode 
                ? `0 20px 40px -12px ${colorMap[category.color]}40, 0 0 0 1px ${colorMap[category.color]}30`
                : `0 20px 40px -12px ${colorMap[category.color]}30, 0 0 0 1px ${colorMap[category.color]}20`,
            }}
            cursor={disabled ? "not-allowed" : "pointer"}
            opacity={disabled ? 0.6 : 1}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            onClick={() => !disabled && onSelectCategory(category.id)}
            boxShadow={isDarkMode ? "lg" : ""}
            overflow="hidden"
            role="button"
            tabIndex={disabled ? -1 : 0}
            _focus={{
              outline: "none",
              ring: 2,
              ringColor: colorMap[category.color],
              ringOffset: 2,
            }}
            w="100%"
            textAlign="left"
          >
            {/* Gradient overlay on hover */}
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bgGradient={`linear(to-br, ${category.color}.50, ${category.color}.100)`}
              opacity={hoveredCategory === category.id ? (isDarkMode ? 0.1 : 0.05) : 0}
              transition="opacity 0.3s"
              pointerEvents="none"
            />
            
            <VStack spacing={5} align="start" position="relative" zIndex={1}>
              <Flex
                align="center"
                justify="center"
                w={16}
                h={16}
                borderRadius="2xl"
                bgGradient={`linear(to-br, ${category.color}.400, ${category.color}.600)`}
                boxShadow={hoveredCategory === category.id ? `0 8px 20px ${colorMap[category.color]}60` : `0 4px 12px ${colorMap[category.color]}40`}
                transform={hoveredCategory === category.id ? "scale(1.1) rotate(5deg)" : "scale(1)"}
                transition="all 0.3s"
              >
                <Text fontSize="3xl" filter="drop-shadow(0 2px 4px rgba(0,0,0,0.1))">
                  {category.icon}
                </Text>
              </Flex>
              <VStack align="start" spacing={2}>
                <Heading
                  size="md"
                  color={hoveredCategory === category.id ? colorMap[category.color] : (isDarkMode ? "white" : "gray.800")}
                  fontWeight="bold"
                  lineHeight="1.2"
                  transition="color 0.3s"
                >
                  {category.title}
                </Heading>
                <Text
                  fontSize="sm"
                  color={isDarkMode ? "gray.400" : "gray.600"}
                  lineHeight="1.5"
                >
                  {category.description}
                </Text>
              </VStack>
            </VStack>

            {/* Decorative corner accent */}
            <Box
              position="absolute"
              top={0}
              right={0}
              w={20}
              h={20}
              bgGradient={`linear(to-br, ${category.color}.400, transparent)`}
              opacity={isDarkMode ? 0.1 : 0.05}
              borderRadius="0 2xl 0 2xl"
              pointerEvents="none"
            />
          </Box>
        ))}
      </Grid>
    </VStack>
  );
};

