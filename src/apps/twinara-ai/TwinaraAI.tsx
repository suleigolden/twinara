import {
    Container,
    Heading,
    VStack,
    Box,
    Input,
    Button,
    Text,
    useToast,
    HStack,
    Avatar,
    Flex,
    Spinner,
    InputGroup,
    InputRightElement,
    IconButton,
    Badge,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Divider,
    useColorModeValue,
} from "@chakra-ui/react";
import { api } from "@suleigolden/the-last-spelling-bee-api-client";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { 
    FaPaperPlane, 
    FaRobot, 
    FaUser, 
    FaMicrophone, 
    FaMicrophoneSlash, 
    FaVolumeUp, 
    FaChevronDown, 
    FaCheck,
    FaSpinner
} from "react-icons/fa";
import { useUser } from "~/hooks/use-user";

type ChatMessage = {
    id: string;
    role: "user" | "assistant";
    content: string;
    createdAt: string;
}

type VoiceOption = {
    name: string;
    lang: string;
    voice: SpeechSynthesisVoice;
    description?: string;
}

// Extend Window interface for SpeechRecognition
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

export const TwinaraAI = () => {
    const { user } = useUser();
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingHistory, setIsLoadingHistory] = useState(true);
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voiceEnabled, setVoiceEnabled] = useState(true);
    const [availableVoices, setAvailableVoices] = useState<VoiceOption[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<VoiceOption | null>(null);
    const toast = useToast();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<any>(null);
    const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
    const userId = user?.id;

    const bgColor = useColorModeValue("white", "gray.800");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const userMessageBg = useColorModeValue("brand.500", "brand.600");
    const assistantMessageBg = useColorModeValue("gray.50", "gray.700");
    const assistantMessageText = useColorModeValue("gray.800", "gray.100");

    // Initialize Speech Recognition
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.warn("Speech Recognition not supported in this browser");
            setVoiceEnabled(false);
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setMessage(transcript);
            setIsListening(false);
            // Auto-send after speech recognition
            setTimeout(() => {
                if (transcript.trim()) {
                    handleSendMessage(transcript);
                }
            }, 100);
        };

        recognition.onerror = (event: any) => {
            console.error("Speech recognition error:", event.error);
            setIsListening(false);
            if (event.error === "not-allowed") {
                toast({
                    title: "Microphone permission denied",
                    description: "Please allow microphone access to use voice input",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                });
            } else {
                toast({
                    title: "Speech recognition error",
                    description: "Could not process voice input. Please try typing instead.",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current = recognition;

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, [toast]);

    // Load available voices and restore saved selection
    useEffect(() => {
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            const voiceOptions: VoiceOption[] = voices
                .filter((voice) => voice.lang.startsWith("en"))
                .map((voice) => ({
                    name: voice.name,
                    lang: voice.lang,
                    voice: voice,
                    description: `${voice.lang} - ${voice.name}`,
                }))
                .sort((a, b) => {
                    // Prioritize US voices
                    if (a.lang.includes("US") && !b.lang.includes("US")) return -1;
                    if (!a.lang.includes("US") && b.lang.includes("US")) return 1;
                    return a.name.localeCompare(b.name);
                });

            setAvailableVoices(voiceOptions);

            // Load saved voice preference
            const savedVoiceName = localStorage.getItem("twinara-selected-voice");
            if (savedVoiceName && voiceOptions.length > 0) {
                const saved = voiceOptions.find((v) => v.name === savedVoiceName);
                if (saved) {
                    setSelectedVoice(saved);
                } else {
                    // Default to first US English voice or first available
                    const defaultVoice = voiceOptions.find((v) => v.lang.includes("en-US")) || voiceOptions[0];
                    setSelectedVoice(defaultVoice);
                }
            } else if (voiceOptions.length > 0) {
                const defaultVoice = voiceOptions.find((v) => v.lang.includes("en-US")) || voiceOptions[0];
                setSelectedVoice(defaultVoice);
            }
        };

        // Voices may load asynchronously
        loadVoices();
        window.speechSynthesis.onvoiceschanged = loadVoices;

        return () => {
            window.speechSynthesis.onvoiceschanged = null;
        };
    }, []);

    // Cleanup speech synthesis on unmount
    useEffect(() => {
        return () => {
            if (synthesisRef.current) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    // Fetch chat history on mount
    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                setIsLoadingHistory(true);
                const chatMessages = await api.service("dementiaUserChatMessages").findByUserId(userId);

                // Transform the API response to ChatMessage format
                const transformedMessages: ChatMessage[] = chatMessages
                    .filter((msg: any) => msg && msg.content)
                    .map((msg: any) => ({
                        id: msg.id,
                        role: msg.content.role,
                        content: msg.content.content,
                        createdAt: msg.createdAt || msg.content.date_created,
                    }));

                setMessages(transformedMessages);
            } catch (error: any) {
                console.error("Error fetching chat history:", error);
                // Don't show error toast for empty history (404)
                if (error.response?.status !== 404) {
                    toast({
                        title: "Error loading chat history",
                        description: error.response?.data?.message || "Failed to load previous messages",
                        status: "error",
                        duration: 3000,
                        isClosable: true,
                    });
                }
            } finally {
                setIsLoadingHistory(false);
            }
        };

        if (userId) {
            fetchChatHistory();
        }
    }, [userId, toast]);

    // Scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Handle voice selection
    const handleVoiceSelect = (voice: VoiceOption) => {
        setSelectedVoice(voice);
        localStorage.setItem("twinara-selected-voice", voice.name);
    };

    // Speak text using Web Speech API
    const speakText = (text: string) => {
        if (!voiceEnabled || !("speechSynthesis" in window)) {
            return;
        }

        // Cancel any ongoing speech
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9; // Slightly slower for clarity
        utterance.pitch = 1;
        utterance.volume = 1;

        // Use selected voice if available
        if (selectedVoice?.voice) {
            utterance.voice = selectedVoice.voice;
        }

        utterance.onstart = () => {
            setIsSpeaking(true);
        };

        utterance.onend = () => {
            setIsSpeaking(false);
        };

        utterance.onerror = (event) => {
            console.error("Speech synthesis error:", event);
            setIsSpeaking(false);
        };

        synthesisRef.current = utterance;
        window.speechSynthesis.speak(utterance);
    };

    // Stop speaking
    const stopSpeaking = () => {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    // Toggle voice input
    const toggleVoiceInput = () => {
        if (!recognitionRef.current) {
            toast({
                title: "Voice input not available",
                description: "Speech recognition is not supported in your browser",
                status: "warning",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            try {
                recognitionRef.current.start();
            } catch (error) {
                console.error("Error starting speech recognition:", error);
                toast({
                    title: "Error starting voice input",
                    description: "Please try again or use text input",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    };

    const handleSendMessage = async (messageText?: string) => {
        const textToSend = messageText || message.trim();
        if (!textToSend || isLoading) return;

        const userMessage = textToSend.trim();
        setMessage("");

        // Stop any ongoing speech
        stopSpeaking();

        // Add user message to UI immediately
        const tempUserMessage: ChatMessage = {
            id: `temp-${Date.now()}`,
            role: "user",
            content: userMessage,
            createdAt: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, tempUserMessage]);

        try {
            setIsLoading(true);

            // Send message to Memory AI Agent
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL || ""}/memory-ai-agent/chat`, {
                userId,
                message: userMessage,
            });

            // Add assistant response to UI
            const assistantMessage: ChatMessage = {
                id: response.data.messageId,
                role: "assistant",
                content: response.data.message,
                createdAt: new Date().toISOString(),
            };

            setMessages((prev) => {
                // Remove temp message and add both user and assistant messages
                const withoutTemp = prev.filter((msg) => !msg.id.startsWith("temp"));
                return [...withoutTemp, tempUserMessage, assistantMessage];
            });

            // Speak the AI response
            if (voiceEnabled) {
                speakText(response.data.message);
            }
        } catch (error: any) {
            console.error("Error sending message:", error);

            // Remove temp message on error
            setMessages((prev) => prev.filter((msg) => !msg.id.startsWith("temp")));

            toast({
                title: "Error sending message",
                description: error.response?.data?.message || "Failed to send message. Please try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <Box bg={useColorModeValue("gray.50", "gray.900")} minH="100vh" py={8}>
            <Container maxW="container.xl">
                <VStack spacing={6} align="stretch">
                    {/* Header Section */}
                    <Box bg={bgColor} p={6} borderRadius="xl" boxShadow="md" borderWidth="1px" borderColor={borderColor}>
                        <HStack justify="space-between" align="flex-start" mb={4}>
                            <VStack align="start" spacing={2}>
                                <Heading as="h1" size="xl" letterSpacing="tight" bgGradient="linear(to-r, brand.400, brand.600)" bgClip="text">
                                    Twinara AI Assistant
                                </Heading>
                                <Text color={useColorModeValue("gray.600", "gray.300")} fontSize="md" maxW="600px">
                                    Chat with Twinara to get personalized support, guidance, and assistance with your daily activities, routines, and questions.
                                </Text>
                            </VStack>
                            {voiceEnabled && (
                                <HStack spacing={3}>
                                    {/* Voice Selection Dropdown */}
                                    <Menu>
                                        <MenuButton
                                            as={Button}
                                            rightIcon={<FaChevronDown />}
                                            size="sm"
                                            variant="outline"
                                            colorScheme="brand"
                                            minW="180px"
                                        >
                                            <HStack spacing={2}>
                                                <FaVolumeUp />
                                                <Text fontSize="sm" isTruncated>
                                                    {selectedVoice ? selectedVoice.name : "Select Voice"}
                                                </Text>
                                            </HStack>
                                        </MenuButton>
                                        <MenuList maxH="400px" overflowY="auto" zIndex={1000}>
                                            <Box px={3} py={2}>
                                                <Text fontSize="xs" fontWeight="bold" color="gray.500" textTransform="uppercase">
                                                    Select AI Voice
                                                </Text>
                                            </Box>
                                            <Divider />
                                            {availableVoices.map((voice) => (
                                                <MenuItem
                                                    key={voice.name}
                                                    onClick={() => handleVoiceSelect(voice)}
                                                    icon={selectedVoice?.name === voice.name ? <FaCheck color="brand.500" /> : undefined}
                                                    bg={selectedVoice?.name === voice.name ? "brand.50" : undefined}
                                                >
                                                    <VStack align="start" spacing={0}>
                                                        <Text fontSize="sm" fontWeight={selectedVoice?.name === voice.name ? "bold" : "normal"}>
                                                            {voice.name}
                                                        </Text>
                                                        <Text fontSize="xs" color="gray.500">
                                                            {voice.lang}
                                                        </Text>
                                                    </VStack>
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </Menu>
                                    {isSpeaking && (
                                        <Badge colorScheme="green" px={3} py={1.5} borderRadius="full">
                                            <HStack spacing={2}>
                                                <FaVolumeUp size={12} />
                                                <Text fontSize="xs">Speaking</Text>
                                            </HStack>
                                        </Badge>
                                    )}
                                    {isListening && (
                                        <Badge colorScheme="red" px={3} py={1.5} borderRadius="full">
                                            <HStack spacing={2}>
                                                <FaMicrophone size={12} />
                                                <Text fontSize="xs">Listening</Text>
                                            </HStack>
                                        </Badge>
                                    )}
                                </HStack>
                            )}
                        </HStack>
                    </Box>

                    {/* Chat Messages Container */}
                    <Box
                        borderWidth="1px"
                        borderRadius="xl"
                        p={6}
                        bg={bgColor}
                        minH="500px"
                        maxH="650px"
                        overflowY="auto"
                        boxShadow="lg"
                        borderColor={borderColor}
                    >
                        {isLoadingHistory ? (
                            <Flex justify="center" align="center" h="500px">
                                <VStack spacing={4}>
                                    <Spinner size="xl" thickness="4px" speed="0.65s" color="brand.500" />
                                    <Text color={useColorModeValue("gray.500", "gray.400")} fontSize="md">
                                        Loading conversation history...
                                    </Text>
                                </VStack>
                            </Flex>
                        ) : messages.length === 0 ? (
                            <Flex justify="center" align="center" h="500px">
                                <VStack spacing={6} maxW="400px" textAlign="center">
                                    <Box
                                        p={6}
                                        bg={useColorModeValue("brand.50", "brand.900")}
                                        borderRadius="full"
                                        display="inline-flex"
                                    >
                                        <FaRobot size={64} color="#3182CE" />
                                    </Box>
                                    <VStack spacing={2}>
                                        <Text color={useColorModeValue("gray.700", "gray.200")} fontSize="xl" fontWeight="semibold">
                                            Start a conversation with Twinara
                                        </Text>
                                        <Text color={useColorModeValue("gray.500", "gray.400")} fontSize="sm" lineHeight="tall">
                                            Ask about your daily activities, routines, schedule, or anything else you need help with. Twinara is here to support and guide you.
                                        </Text>
                                    </VStack>
                                </VStack>
                            </Flex>
                        ) : (
                            <VStack spacing={4} align="stretch" py={2}>
                                {messages.map((msg) => (
                                    <Flex
                                        key={msg.id}
                                        justify={msg.role === "user" ? "flex-end" : "flex-start"}
                                        align="flex-start"
                                        gap={3}
                                        px={2}
                                    >
                                        {msg.role === "assistant" && (
                                            <Avatar
                                                size="md"
                                                bg="brand.500"
                                                icon={<FaRobot />}
                                                name="Twinara AI"
                                                boxShadow="md"
                                            />
                                        )}
                                        <Box
                                            maxW="75%"
                                            p={4}
                                            borderRadius="xl"
                                            bg={msg.role === "user" ? userMessageBg : assistantMessageBg}
                                            color={msg.role === "user" ? "white" : assistantMessageText}
                                            boxShadow="md"
                                            position="relative"
                                            borderWidth={msg.role === "assistant" ? "1px" : "0"}
                                            borderColor={msg.role === "assistant" ? borderColor : "transparent"}
                                            transition="all 0.2s"
                                            _hover={msg.role === "assistant" ? { boxShadow: "lg", transform: "translateY(-1px)" } : {}}
                                        >
                                            <Text fontSize="sm" whiteSpace="pre-wrap" lineHeight="tall">
                                                {msg.content}
                                            </Text>
                                            {msg.role === "assistant" && voiceEnabled && (
                                                <IconButton
                                                    aria-label="Play message"
                                                    icon={<FaVolumeUp />}
                                                    size="sm"
                                                    variant="ghost"
                                                    colorScheme="brand"
                                                    position="absolute"
                                                    top={2}
                                                    right={2}
                                                    onClick={() => speakText(msg.content)}
                                                    isDisabled={isSpeaking}
                                                    opacity={0.7}
                                                    _hover={{ opacity: 1 }}
                                                />
                                            )}
                                        </Box>
                                        {msg.role === "user" && (
                                            <Avatar
                                                size="md"
                                                bg={useColorModeValue("gray.400", "gray.600")}
                                                icon={<FaUser />}
                                                name={user?.firstName}
                                                boxShadow="md"
                                            />
                                        )}
                                    </Flex>
                                ))}
                                {isLoading && (
                                    <Flex justify="flex-start" align="flex-start" gap={3} px={2}>
                                        <Avatar
                                            size="md"
                                            bg="brand.500"
                                            icon={<FaRobot />}
                                            name="Twinara AI"
                                            boxShadow="md"
                                        />
                                        <Box
                                            p={4}
                                            borderRadius="xl"
                                            bg={assistantMessageBg}
                                            boxShadow="md"
                                            borderWidth="1px"
                                            borderColor={borderColor}
                                        >
                                            <HStack spacing={3}>
                                                <Spinner size="sm" thickness="3px" speed="0.65s" color="brand.500" />
                                                <Text fontSize="sm" color={assistantMessageText}>
                                                    Twinara is thinking...
                                                </Text>
                                            </HStack>
                                        </Box>
                                    </Flex>
                                )}
                                <div ref={messagesEndRef} />
                            </VStack>
                        )}
                    </Box>

                    {/* Message Input */}
                    <Box bg={bgColor} p={4} borderRadius="xl" boxShadow="lg" borderWidth="1px" borderColor={borderColor}>
                        <HStack spacing={3}>
                            <InputGroup size="lg" flex={1}>
                                <Input
                                    placeholder={
                                        voiceEnabled
                                            ? "Type your message or click the microphone to speak..."
                                            : "Type your message here..."
                                    }
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    isDisabled={isLoading || isListening}
                                    bg={useColorModeValue("white", "gray.700")}
                                    borderWidth="2px"
                                    borderColor={borderColor}
                                    borderRadius="xl"
                                    pr={voiceEnabled ? "10rem" : "6rem"}
                                    _focus={{
                                        borderColor: "brand.500",
                                        boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
                                    }}
                                    fontSize="md"
                                />
                                <InputRightElement width={voiceEnabled ? "10rem" : "6rem"} pr={2}>
                                    <HStack spacing={2}>
                                        {voiceEnabled && (
                                            <IconButton
                                                aria-label="Voice input"
                                                icon={isListening ? <FaMicrophoneSlash /> : <FaMicrophone />}
                                                size="md"
                                                colorScheme={isListening ? "red" : "brand"}
                                                onClick={toggleVoiceInput}
                                                isDisabled={isLoading}
                                                variant={isListening ? "solid" : "ghost"}
                                                borderRadius="lg"
                                            />
                                        )}
                                        <Button
                                            size="md"
                                            colorScheme="brand"
                                            onClick={() => handleSendMessage()}
                                            isLoading={isLoading}
                                            isDisabled={!message.trim() || isListening}
                                            leftIcon={<FaPaperPlane />}
                                            borderRadius="lg"
                                        >
                                            Send
                                        </Button>
                                    </HStack>
                                </InputRightElement>
                            </InputGroup>
                            {isSpeaking && (
                                <IconButton
                                    aria-label="Stop speaking"
                                    icon={<FaVolumeUp />}
                                    size="lg"
                                    colorScheme="red"
                                    onClick={stopSpeaking}
                                    variant="solid"
                                    borderRadius="xl"
                                    boxShadow="md"
                                />
                            )}
                        </HStack>
                        <Text fontSize="xs" color={useColorModeValue("gray.500", "gray.400")} mt={2} ml={2}>
                            Press Enter to send • Shift+Enter for new line
                        </Text>
                    </Box>
                </VStack>
            </Container>
        </Box>
    );
};
