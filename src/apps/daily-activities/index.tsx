import { useState } from "react";
import {
  Box,
  Container,
  Flex,
  VStack,
  HStack,
  Text,
  Button,
  Progress,
  Heading,
  Icon,
  IconButton,
  Alert,
  AlertIcon,
  AlertDescription,
  useColorModeValue,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { FaHeart, FaTimes} from "react-icons/fa";
import { useTheme } from "~/contexts/ThemeContext";
import { Question, GameState, QuestionCategory } from "./types";
import { CategorySelection } from "./components/CategorySelection";
import { QuestionCard } from "./components/QuestionCard";
import { CompletionScreen } from "./components/CompletionScreen";
import { api, ActivityQuestionType, GeneratedQuestion } from "@suleigolden/the-last-spelling-bee-api-client";
import { useUser } from "~/hooks/use-user";

type GameScreen = "category-selection" | "playing" | "completed" | "game-over";

// Map frontend QuestionCategory to backend ActivityQuestionType
const mapCategoryToActivityQuestionType = (category: QuestionCategory): ActivityQuestionType => {
  const mapping: Record<QuestionCategory, ActivityQuestionType> = {
    "identity-self-recall": "IDENTITY_SELF_RECALL",
    "people-relationships": "PEOPLE_RELATIONSHIPS",
    "routine-daily-awareness": "ROUTINE_DAILY_AWARENESS",
    "recognition-based": "RECOGNITION_TASKS",
    "story-memory": "STORY_AND_MEMORY",
    "behavioral-prompts": "WELLNESS_PROMPTS",
  };
  return mapping[category];
};

// Transform GeneratedQuestion from API to Question type used in frontend
const transformGeneratedQuestion = (generatedQuestion: GeneratedQuestion, index: number, category: QuestionCategory): Question => {
  return {
    id: `q-${index}`,
    category,
    type: generatedQuestion.answerType === "yes-no" ? "yes-no" : "multiple-choice",
    question: generatedQuestion.question,
    options: generatedQuestion.options?.map((opt) => opt.label) || undefined,
    correctAnswer: generatedQuestion.correctAnswer === "Yes" 
      ? true 
      : generatedQuestion.correctAnswer === "No" 
      ? false 
      : generatedQuestion.correctAnswer,
    explanation: undefined,
  };
};

export const DailyActivities = () => {
  const { isDarkMode } = useTheme();
  const { user } = useUser();
  const toast = useToast();
  const [currentScreen, setCurrentScreen] = useState<GameScreen>("category-selection");
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    currentQuestionIndex: 0,
    score: 0,
    lives: 5,
    totalXP: 0,
    accuracy: 0,
    answeredQuestions: 0,
    correctAnswers: 0,
  });
  const [showFeedback, setShowFeedback] = useState<{ type: "correct" | "incorrect"; message: string } | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | boolean | null>(null);

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const NUMBER_OF_QUESTIONS = 10;

  const startGame = async (category: QuestionCategory) => {
    if (!user?.id) {
      toast({
        title: "Error",
        description: "User ID is required. Please sign in.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setSelectedCategory(category);
    setIsLoadingQuestions(true);

    try {
      const activityQuestionType = mapCategoryToActivityQuestionType(category);
      
      const response = await api.service("twinaraActivityGame").generateQuestions({
        userId: user.id,
        questionType: activityQuestionType,
        numberOfQuestions: NUMBER_OF_QUESTIONS, // Generate 10 questions
      });

      // Transform API questions to frontend Question format (use all 10 questions)
      const transformedQuestions = response.questions
        .map((q, index) => transformGeneratedQuestion(q, index, category));

      // Shuffle the questions
      const shuffled = [...transformedQuestions].sort(() => Math.random() - 0.5);
      
      setQuestions(shuffled);
      setGameState({
        currentQuestionIndex: 0,
        score: 0,
        lives: 5,
        totalXP: 0,
        accuracy: 0,
        answeredQuestions: 0,
        correctAnswers: 0,
      });
      setCurrentScreen("playing");
    } catch (error: any) {
      console.error("Error generating questions:", error);
      toast({
        title: "Error",
        description: error?.response?.data?.message || "Failed to generate questions. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setCurrentScreen("category-selection");
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  const handleAnswer = (answer: string | boolean) => {
    if (selectedAnswer !== null) return; // Prevent double clicks

    const currentQuestion = questions[gameState.currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;

    setSelectedAnswer(answer);

    const newGameState = {
      ...gameState,
      answeredQuestions: gameState.answeredQuestions + 1,
      correctAnswers: isCorrect ? gameState.correctAnswers + 1 : gameState.correctAnswers,
      lives: isCorrect ? gameState.lives : gameState.lives - 1,
      totalXP: isCorrect ? gameState.totalXP + 10 : gameState.totalXP,
    };

    const newAccuracy = Math.round((newGameState.correctAnswers / newGameState.answeredQuestions) * 100);
    newGameState.accuracy = newAccuracy;

    setShowFeedback({
      type: isCorrect ? "correct" : "incorrect",
      message: isCorrect ? "Excellent!" : currentQuestion.explanation || "Keep going!",
    });

    setTimeout(() => {
      setShowFeedback(null);
      setSelectedAnswer(null);

      if (newGameState.lives <= 0) {
        setGameState(newGameState);
        setCurrentScreen("game-over");
      } else if (newGameState.currentQuestionIndex >= questions.length - 1) {
        setGameState(newGameState);
        setCurrentScreen("completed");
      } else {
        setGameState({
          ...newGameState,
          currentQuestionIndex: newGameState.currentQuestionIndex + 1,
        });
      }
    }, 2000);
  };

  const handleContinue = () => {
    if (currentScreen === "completed" || currentScreen === "game-over") {
      setCurrentScreen("category-selection");
      setSelectedCategory(null);
      setQuestions([]);
    }
  };

  const handleExit = () => {
    setCurrentScreen("category-selection");
    setSelectedCategory(null);
    setQuestions([]);
  };

  const currentQuestion = questions[gameState.currentQuestionIndex];
  const progress = questions.length > 0 ? ((gameState.currentQuestionIndex + 1) / questions.length) * 100 : 0;

  return (
    <Box minH="100vh" bg={bgColor} py={8}>
      <Container maxW="container.md">
        {currentScreen === "category-selection" && (
          <Box position="relative">
            {isLoadingQuestions && (
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bg={isDarkMode ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.9)"}
                display="flex"
                alignItems="center"
                justifyContent="center"
                zIndex={10}
                borderRadius="xl"
              >
                <VStack spacing={4}>
                  <Spinner size="xl" color="green.500" />
                  <Text
                    fontSize="lg"
                    fontWeight="semibold"
                    color={isDarkMode ? "white" : "gray.800"}
                  >
                    Generating questions...
                  </Text>
                </VStack>
              </Box>
            )}
            <CategorySelection onSelectCategory={startGame} disabled={isLoadingQuestions} />
          </Box>
        )}

        {currentScreen === "playing" && currentQuestion && (
          <VStack spacing={6} align="stretch">
            {/* Top Bar */}
            <Flex justify="space-between" align="center" w="full">
              <IconButton
                aria-label="Exit game"
                icon={<FaTimes />}
                variant="ghost"
                colorScheme="gray"
                onClick={handleExit}
              />
              <Progress
                value={progress}
                colorScheme="green"
                borderRadius="full"
                size="md"
                flex={1}
                mx={4}
                bg={isDarkMode ? "gray.700" : "gray.200"}
              />
              <HStack spacing={2}>
                <Icon as={FaHeart} color="red.500" />
                <Text fontWeight="bold" color={isDarkMode ? "white" : "gray.800"}>
                  {gameState.lives}
                </Text>
              </HStack>
            </Flex>

            {/* Question Card */}
            <QuestionCard
              question={currentQuestion}
              onAnswer={handleAnswer}
              selectedAnswer={selectedAnswer}
              disabled={selectedAnswer !== null || showFeedback !== null}
            />

            {/* Feedback */}
            {showFeedback && (
              <Alert
                status={showFeedback.type === "correct" ? "success" : "warning"}
                borderRadius="md"
              >
                <AlertIcon />
                <AlertDescription fontWeight="semibold">
                  {showFeedback.message}
                </AlertDescription>
              </Alert>
            )}
          </VStack>
        )}

        {currentScreen === "completed" && (
          <CompletionScreen
            gameState={gameState}
            onContinue={handleContinue}
            onReview={handleExit}
          />
        )}

        {currentScreen === "game-over" && (
          <VStack spacing={6} align="center" py={12}>
            <Icon as={FaTimes} boxSize={16} color="red.500" />
            <Heading size="xl" color={isDarkMode ? "white" : "gray.800"}>
              Game Over
            </Heading>
            <Text fontSize="lg" color={isDarkMode ? "gray.400" : "gray.600"}>
              You ran out of lives! Don't worry, you did great!
            </Text>
            <VStack spacing={4} w="full" maxW="400px">
              <Box
                w="full"
                p={6}
                bg={cardBg}
                borderRadius="xl"
                boxShadow="lg"
                textAlign="center"
              >
                <Text fontSize="2xl" fontWeight="bold" color={isDarkMode ? "white" : "gray.800"}>
                  Total XP: {gameState.totalXP}
                </Text>
                <Text fontSize="lg" color={isDarkMode ? "gray.400" : "gray.600"}>
                  Accuracy: {gameState.accuracy}%
                </Text>
              </Box>
              <Button
                colorScheme="green"
                size="lg"
                w="full"
                onClick={handleContinue}
              >
                Try Again
              </Button>
            </VStack>
          </VStack>
        )}
      </Container>
    </Box>
  );
};
