import { VStack, Text, Button, Box, Flex, HStack } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";
import { useTheme } from "~/contexts/ThemeContext";
import { Question } from "../types";
import { useMemo } from "react";

type QuestionCardProps = {
  question: Question;
  onAnswer: (answer: string | boolean) => void;
  selectedAnswer: string | boolean | null;
  disabled: boolean;
};

export const QuestionCard = ({
  question,
  onAnswer,
  selectedAnswer,
  disabled,
}: QuestionCardProps) => {
  const { isDarkMode } = useTheme();

  const handleAnswerClick = (answer: string | boolean) => {
    if (!disabled) {
      onAnswer(answer);
    }
  };

  const isCorrect = (answer: string | boolean) => {
    return answer === question.correctAnswer;
  };

  const isSelected = (answer: string | boolean) => {
    return selectedAnswer === answer;
  };

  // Shuffle options once per question to ensure correct answer isn't always first
  const shuffledOptions = useMemo(() => {
    if (question.type === "multiple-choice" && question.options) {
      return [...question.options].sort(() => Math.random() - 0.5);
    }
    return question.options;
  }, [question.id, question.options]);

  return (
    <VStack spacing={6} align="stretch">

      {/* Question Text */}
      <Text
        fontSize="2xl"
        fontWeight="bold"
        color={isDarkMode ? "white" : "gray.800"}
        textAlign="center"
        py={4}
      >
        {question.question}
      </Text>

      {/* Answer Options */}
      <VStack spacing={4} w="full">
        {question.type === "multiple-choice" && shuffledOptions ? (
          shuffledOptions.map((option, index) => {
            const selected = isSelected(option);
            const correct = isCorrect(option);
            const showResult = selectedAnswer !== null;

            return (
              <Button
                key={index}
                w="full"
                size="lg"
                variant="outline"
                fontSize="lg"
                py={8}
                bg={
                  showResult && correct && selected
                    ? "green.500"
                    : showResult && selected && !correct
                    ? "red.500"
                    : isDarkMode
                    ? "gray.800"
                    : "white"
                }
                color={
                  showResult && (correct || (selected && !correct))
                    ? "white"
                    : isDarkMode
                    ? "white"
                    : "gray.800"
                }
                boxShadow="0 4px 16px rgba(0, 0, 0, 0.2), 0 2px 6px rgba(0, 0, 0, 0.1)"
                borderColor={
                  showResult && correct && selected
                    ? "green.500"
                    : showResult && selected && !correct
                    ? "red.500"
                    : isDarkMode
                    ? "gray.600"
                    : "gray.300"
                }
                _hover={{
                  borderColor: disabled ? undefined : "green.400",
                  transform: disabled ? undefined : "scale(1.02)",
                }}
                onClick={() => handleAnswerClick(option)}
                isDisabled={disabled}
                position="relative"
                transition="all 0.2s"
              >
                <HStack spacing={3} w="full" justify="flex-start" pl={4}>
                  <Box
                    w={10}
                    h={10}
                    borderRadius="full"
                    bg={isDarkMode ? "gray.700" : "blue.50"}
                    color={isDarkMode ? "white" : "gray.900"}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="sm"
                    fontWeight="bold"
                    flexShrink={0}
                  >
                    {String.fromCharCode(65 + index)}
                  </Box>
                  {showResult && correct && selected && (
                    <FaCheck />
                  )}
                  <Text fontWeight="semibold" ml={4}>{option}</Text>
                </HStack>
              </Button>
            );
          })
        ) : (
          <>
            <Button
              w="full"
              size="lg"
              colorScheme="green"
              fontSize="lg"
              py={8}
              borderRadius="xl"
              onClick={() => handleAnswerClick(true)}
              isDisabled={disabled}
              bg={
                selectedAnswer === true
                  ? isCorrect(true)
                    ? "green.500"
                    : "red.500"
                  : "green.500"
              }
              _hover={{
                bg: disabled ? undefined : "green.600",
                transform: disabled ? undefined : "scale(1.02)",
              }}
              transition="all 0.2s"
            >
              <HStack spacing={2}>
                <FaCheck />
                <Text fontWeight="bold">Yes</Text>
              </HStack>
            </Button>
            <Button
              w="full"
              size="lg"
              colorScheme="red"
              fontSize="lg"
              py={8}
              borderRadius="xl"
              onClick={() => handleAnswerClick(false)}
              isDisabled={disabled}
              bg={
                selectedAnswer === false
                  ? isCorrect(false)
                    ? "green.500"
                    : "red.500"
                  : "red.500"
              }
              _hover={{
                bg: disabled ? undefined : "red.600",
                transform: disabled ? undefined : "scale(1.02)",
              }}
              transition="all 0.2s"
            >
              <Text fontWeight="bold">No</Text>
            </Button>
          </>
        )}
      </VStack>
    </VStack>
  );
};

