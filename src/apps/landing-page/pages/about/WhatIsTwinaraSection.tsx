import { motion } from "framer-motion";
import { fadeIn } from "../../../../utils/motion";
import { useTheme } from "../../../../contexts/ThemeContext";
import { Box, Heading, Text, Flex, Grid } from "@chakra-ui/react";

export const WhatIsTwinaraSection = () => {
    const { isDarkMode } = useTheme();

    return (
        <Box
            as={motion.section}
            variants={fadeIn("up", 0.4)}
            initial="hidden"
            animate="show"
            mt={16}
        >
            <Box>
                <Heading
                    as="h2"
                    size="2xl"
                    mb={6}
                    bgGradient="linear(to-r, blue.400, teal.400)"
                    bgClip="text"
                    className={`text-2xl md:text-3xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                >
                    What is Twinara?
                </Heading>

                <Text
                    className={`text-lg md:text-xl leading-relaxed mb-6 ${isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                >
                    Twinara is a gamified, AI-powered cognitive companion designed to gently support individuals living with dementia by helping them practice memory, routine awareness, and identity recall using their own life information.
                </Text>

                <Text
                    className={`text-base md:text-lg leading-relaxed mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"
                        }`}
                >
                    Unlike traditional brain games, Twinara does not use abstract puzzles or generic trivia. Instead, it generates personalized questions and tasks based on:
                </Text>

                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4} mt={6}>
                    {[
                        "The user's personal history",
                        "Their family and relationships",
                        "Their hobbies and work background",
                        "Their daily and weekly routines",
                        "Uploaded documents (Word files)",
                        "Conversation history",
                    ].map((item, index) => (
                        <Flex key={index} align="center" gap={3}>
                            <Box
                                className={`w-2 h-2 rounded-full ${isDarkMode ? "bg-blue-400" : "bg-blue-600"
                                    }`}
                            />
                            <Text
                                className={`text-sm md:text-base ${isDarkMode ? "text-gray-300" : "text-gray-700"
                                    }`}
                            >
                                {item}
                            </Text>
                        </Flex>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

