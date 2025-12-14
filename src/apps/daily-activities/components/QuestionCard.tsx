import { VStack, Text, Button, Box, Flex, HStack } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";
import { useTheme } from "~/contexts/ThemeContext";
import { Question } from "../types";

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

  return (
    <VStack spacing={6} align="stretch">
      {/* NEW WORD/QUESTION Banner */}
      <Box
        bg={isDarkMode ? "purple.700" : "purple.100"}
        color={isDarkMode ? "purple.200" : "purple.700"}
        px={4}
        py={2}
        borderRadius="md"
        w="fit-content"
        fontSize="sm"
        fontWeight="bold"
      >
        NEW QUESTION
      </Box>

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
        {question.type === "multiple-choice" && question.options ? (
          question.options.map((option, index) => {
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
                borderRadius="xl"
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
                borderWidth="2px"
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
                <HStack spacing={3} w="full" justify="center">
                  {showResult && correct && selected && (
                    <FaCheck />
                  )}
                  <Text fontWeight="semibold">{option}</Text>
                  <Box
                    position="absolute"
                    right={4}
                    w={8}
                    h={8}
                    borderRadius="full"
                    bg={isDarkMode ? "gray.700" : "gray.100"}
                    color={isDarkMode ? "white" : "gray.600"}
                    display="flex"
                    align="center"
                    justify="center"
                    fontSize="sm"
                    fontWeight="bold"
                  >
                    {index + 1}
                  </Box>
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

