import { useState, useEffect } from "react";
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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
} from "@chakra-ui/react";
import { FaHeart, FaTimes, FaPlus, FaTrophy, FaQuestionCircle, FaCalendarAlt } from "react-icons/fa";
import { useTheme } from "~/contexts/ThemeContext";
import { Question, GameState, QuestionCategory } from "./types";
import { QuestionCard } from "./components/QuestionCard";
import { CompletionScreen } from "./components/CompletionScreen";
import { ChooseYourActivityModal } from "./ChooseYourActivityModal";
import { api, ActivityQuestionType, GeneratedQuestion, TwinaraActivityGame, CreateTwinaraActivityGameRequest } from "@suleigolden/the-last-spelling-bee-api-client";
import { useUser } from "~/hooks/use-user";
import { getQuestionsFromStorage, storeQuestionsInStorage } from "../../common/utils/questionsStorage";
import { formatDateToString, formatDateToStringWithoutTime } from "~/common/utils/date-time";

type GameScreen = "activities-list" | "playing" | "completed" | "game-over";

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

// Map backend ActivityQuestionType to display name
const mapActivityQuestionTypeToDisplayName = (questionType: ActivityQuestionType): string => {
  const mapping: Record<ActivityQuestionType, string> = {
    "IDENTITY_SELF_RECALL": "Identity & Self Recall",
    "PEOPLE_RELATIONSHIPS": "People & Relationships",
    "ROUTINE_DAILY_AWARENESS": "Routine & Daily Awareness",
    "RECOGNITION_TASKS": "Recognition Tasks",
    "STORY_AND_MEMORY": "Story & Memory",
    "WELLNESS_PROMPTS": "Wellness Prompts",
  };
  return mapping[questionType];
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
  const [currentScreen, setCurrentScreen] = useState<GameScreen>("activities-list");
  const [selectedCategory, setSelectedCategory] = useState<QuestionCategory | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [activities, setActivities] = useState<TwinaraActivityGame[]>([]);
  const [isLoadingActivities, setIsLoadingActivities] = useState(false);
  const [isSavingGame, setIsSavingGame] = useState(false);
  const [gameSaved, setGameSaved] = useState(false);
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
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
  const tableBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const NUMBER_OF_QUESTIONS = 10;

  // Fetch activities on component mount
  useEffect(() => {
    const fetchActivities = async () => {
      if (!user?.id) return;
      
      setIsLoadingActivities(true);
      try {
        const userActivities = await api.service("twinaraActivityGame").findByUserId(user.id);
        setActivities(userActivities);
      } catch (error: any) {
        console.error("Error fetching activities:", error);
        toast({
          title: "Error",
          description: "Failed to load activity history.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsLoadingActivities(false);
      }
    };

    fetchActivities();
  }, [user?.id, toast]);

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
      // Check if questions exist in local storage
      let generatedQuestions: GeneratedQuestion[] | null = getQuestionsFromStorage(category);
      
      if (!generatedQuestions) {
        // Generate new questions from server
        const activityQuestionType = mapCategoryToActivityQuestionType(category);
        
        const response = await api.service("twinaraActivityGame").generateQuestions({
          userId: user.id,
          questionType: activityQuestionType,
          numberOfQuestions: NUMBER_OF_QUESTIONS, // Generate 10 questions
        });

        generatedQuestions = response.questions;
        
        // Store questions in local storage
        storeQuestionsInStorage(category, generatedQuestions);
      }

      // Transform API questions to frontend Question format (use all questions)
      const transformedQuestions = generatedQuestions
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
      setGameSaved(false);
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
      setCurrentScreen("activities-list");
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  const saveGameCompletion = async (finalGameState: GameState, category: QuestionCategory) => {
    if (!user?.id || gameSaved) return; // Don't save twice

    setIsSavingGame(true);
    try {
      const activityQuestionType = mapCategoryToActivityQuestionType(category);
      
      const gameData: CreateTwinaraActivityGameRequest = {
        userId: user.id,
        questionType: activityQuestionType,
        numberOfQuestions: questions.length,
        points: finalGameState.totalXP,
      };

      await api.service("twinaraActivityGame").createTwinaraActivityGame(gameData);
      setGameSaved(true);
    } catch (error: any) {
      console.error("Error saving game completion:", error);
      toast({
        title: "Error",
        description: "Failed to save game results. Your progress is still recorded.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsSavingGame(false);
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
        // Save game even if game-over (with points earned)
        if (selectedCategory && newGameState.totalXP > 0) {
          saveGameCompletion(newGameState, selectedCategory);
        }
      } else if (newGameState.currentQuestionIndex >= questions.length - 1) {
        setGameState(newGameState);
        setCurrentScreen("completed");
        // Save game completion
        if (selectedCategory) {
          saveGameCompletion(newGameState, selectedCategory);
        }
      } else {
        setGameState({
          ...newGameState,
          currentQuestionIndex: newGameState.currentQuestionIndex + 1,
        });
      }
    }, 2000);
  };

  const handleContinue = async () => {
    if (currentScreen === "completed" || currentScreen === "game-over") {
      setCurrentScreen("activities-list");
      setSelectedCategory(null);
      setQuestions([]);
      setGameSaved(false);
      // Refresh activities list
      if (user?.id) {
        try {
          const userActivities = await api.service("twinaraActivityGame").findByUserId(user.id);
          setActivities(userActivities);
        } catch (error) {
          console.error("Error refreshing activities:", error);
        }
      }
    }
  };

  const handleExit = () => {
    setCurrentScreen("activities-list");
    setSelectedCategory(null);
    setQuestions([]);
  };

  const currentQuestion = questions[gameState.currentQuestionIndex];
  const progress = questions.length > 0 ? ((gameState.currentQuestionIndex + 1) / questions.length) * 100 : 0;

  return (
    <Box minH="100vh" bg={bgColor} py={8}>
      <Container maxW="container.xl" mt={10}>
        {currentScreen === "activities-list" && (
          <VStack spacing={6} align="stretch">
            <Flex justify="space-between" align="center">
              <Heading size="xl" color={isDarkMode ? "white" : "gray.800"}>
                Daily Activities
              </Heading>
              <Button
                leftIcon={<FaPlus />}
                colorScheme="brand"
                size="lg"
                onClick={onModalOpen}
              >
                Start Learning
              </Button>
            </Flex>

            <Box
              bg={tableBg}
              borderRadius="2xl"
              boxShadow={isDarkMode ? "2xl" : "lg"}
              overflow="hidden"
              border="1px"
              borderColor={borderColor}
            >
              {isLoadingActivities ? (
                <Flex justify="center" align="center" py={16}>
                  <VStack spacing={4}>
                    <Spinner size="xl" color="blue.500" thickness="4px" />
                    <Text fontSize="md" color={isDarkMode ? "gray.400" : "gray.600"}>
                      Loading activities...
                    </Text>
                  </VStack>
                </Flex>
              ) : activities.length === 0 ? (
                <Box py={16} textAlign="center">
                  <VStack spacing={4}>
                    <Box
                      p={6}
                      borderRadius="full"
                      bg={isDarkMode ? "gray.700" : "gray.100"}
                      display="inline-flex"
                    >
                      <Icon as={FaTrophy} boxSize={8} color={isDarkMode ? "gray.400" : "gray.500"} />
                    </Box>
                    <Text fontSize="lg" fontWeight="semibold" color={isDarkMode ? "gray.300" : "gray.700"}>
                      No activities yet
                    </Text>
                    <Text fontSize="sm" color={isDarkMode ? "gray.500" : "gray.600"}>
                      Start a new activity to begin your learning journey!
                    </Text>
                  </VStack>
                </Box>
              ) : (
                <Table variant="simple" size="md">
                  <Thead>
                    <Tr bg={isDarkMode ? "gray.800" : "gray.100"}>
                      <Th 
                        color={isDarkMode ? "white" : "gray.800"} 
                        fontWeight="bold"
                        textTransform="uppercase"
                        fontSize="xs"
                        letterSpacing="wide"
                        py={4}
                        px={6}
                        borderBottom="2px solid"
                        borderColor={isDarkMode ? "gray.600" : "gray.300"}
                      >
                        Activity Type
                      </Th>
                      <Th 
                        color={isDarkMode ? "white" : "gray.800"} 
                        fontWeight="bold"
                        textTransform="uppercase"
                        fontSize="xs"
                        letterSpacing="wide"
                        py={4}
                        px={6}
                        borderBottom="2px solid"
                        borderColor={isDarkMode ? "gray.600" : "gray.300"}
                        textAlign="center"
                      >
                        Questions
                      </Th>
                      <Th 
                        color={isDarkMode ? "white" : "gray.800"} 
                        fontWeight="bold"
                        textTransform="uppercase"
                        fontSize="xs"
                        letterSpacing="wide"
                        py={4}
                        px={6}
                        borderBottom="2px solid"
                        borderColor={isDarkMode ? "gray.600" : "gray.300"}
                        textAlign="center"
                      >
                        Points
                      </Th>
                      <Th 
                        color={isDarkMode ? "white" : "gray.800"} 
                        fontWeight="bold"
                        textTransform="uppercase"
                        fontSize="xs"
                        letterSpacing="wide"
                        py={4}
                        px={6}
                        borderBottom="2px solid"
                        borderColor={isDarkMode ? "gray.600" : "gray.300"}
                      >
                        Date
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {activities.map((activity, index) => (
                      <Tr
                        key={activity.id}
                        bg={isDarkMode 
                          ? (index % 2 === 0 ? "gray.800" : "gray.750") 
                          : (index % 2 === 0 ? "white" : "gray.50")
                        }
                        _hover={{
                          bg: isDarkMode ? "gray.700" : "blue.50",
                          transform: "scale(1.01)",
                          boxShadow: isDarkMode 
                            ? "0 4px 12px rgba(0,0,0,0.3)" 
                            : "0 4px 12px rgba(0,0,0,0.1)",
                        }}
                        transition="all 0.2s ease"
                        cursor="pointer"
                        borderBottom="1px solid"
                        borderColor={isDarkMode ? "gray.700" : "gray.200"}
                      >
                        <Td 
                          color={isDarkMode ? "white" : "gray.800"} 
                          fontWeight="semibold"
                          py={5}
                          px={6}
                        >
                          <HStack spacing={3}>
                            <Box
                              p={2}
                              borderRadius="lg"
                              bg={isDarkMode ? "blue.900" : "blue.100"}
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                            >
                              <Icon 
                                as={FaTrophy} 
                                boxSize={4} 
                                color={isDarkMode ? "blue.300" : "blue.600"} 
                              />
                            </Box>
                            <Text>{mapActivityQuestionTypeToDisplayName(activity.questionType)}</Text>
                          </HStack>
                        </Td>
                        <Td 
                          color={isDarkMode ? "gray.300" : "gray.700"} 
                          py={5}
                          px={6}
                          textAlign="center"
                        >
                          <HStack spacing={2} justify="center">
                            <Icon 
                              as={FaQuestionCircle} 
                              boxSize={3} 
                              color={isDarkMode ? "gray.500" : "gray.400"} 
                            />
                            <Text fontWeight="medium" color={"gray.900"}>{activity.numberOfQuestions} Questions</Text>
                          </HStack>
                        </Td>
                        <Td 
                          color={isDarkMode ? "yellow.300" : "yellow.600"} 
                          fontWeight="bold"
                          fontSize="lg"
                          py={5}
                          px={6}
                          textAlign="center"
                        >
                          <HStack spacing={2} justify="center">
                            <Icon 
                              as={FaTrophy} 
                              boxSize={4} 
                              color={isDarkMode ? "yellow.400" : "yellow.500"} 
                            />
                            <Text>{activity.points}</Text>
                          </HStack>
                        </Td>
                        <Td 
                          color={isDarkMode ? "gray.300" : "gray.600"} 
                          py={5}
                          px={6}
                        >
                          <HStack spacing={2}>
                            <Icon 
                              as={FaCalendarAlt} 
                              boxSize={3} 
                              color={"gray.900"} 
                            />
                            <Text fontSize="sm" color={"gray.900"}>{formatDateToStringWithoutTime(activity.createdAt.toLocaleString())}</Text>
                          </HStack>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              )}
            </Box>
          </VStack>
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
            isSaving={isSavingGame}
            gameSaved={gameSaved}
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

        {/* Choose Activity Modal */}
        <ChooseYourActivityModal
          isOpen={isModalOpen}
          onClose={onModalClose}
          onSelectCategory={startGame}
          disabled={isLoadingQuestions}
          isLoadingQuestions={isLoadingQuestions}
        />
      </Container>
    </Box>
  );
};
