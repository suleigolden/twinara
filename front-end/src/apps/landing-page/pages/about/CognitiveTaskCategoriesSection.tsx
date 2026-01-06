import { motion } from "framer-motion";
import { fadeIn } from "../../../../utils/motion";
import { useTheme } from "../../../../contexts/ThemeContext";
import { Box, Heading, Text, Flex, Grid, VStack } from "@chakra-ui/react";
import { cognitiveTasks } from "./constants";

export const CognitiveTaskCategoriesSection = () => {
    const { isDarkMode } = useTheme();

    return (
        <Box
            as={motion.section}
            variants={fadeIn("up", 1.0)}
            initial="hidden"
            animate="show"
            mt={20}
        >
            <Heading
                as="h2"
                className={`text-4xl md:text-5xl font-bold text-center mb-4 ${isDarkMode ? "text-white" : "text-gray-900"
                    }`}
            >
                Cognitive Task Categories
            </Heading>
            <Text
                className={`text-base md:text-lg text-center mx-auto mb-12 ${isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                align="center"
                mb={12}
            >
                All Twinara tasks are generated from user-specific data and designed to support different aspects of memory and cognition
            </Text>

            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
                {cognitiveTasks.map((task, index) => (
                    <Box
                        as={motion.div}
                        key={index}
                        variants={fadeIn("up", 0.2 * index)}
                        className={`p-6 rounded-xl transition-all duration-500 hover:scale-[1.02]
                ${isDarkMode
                                ? "bg-gray-800/40 backdrop-blur-md border border-gray-700/50"
                                : "bg-white shadow-lg border border-gray-200"
                            }`}
                    >
                        <Flex
                            align="center"
                            gap={3}
                            mb={4}
                        >
                            <Flex
                                className={`w-12 h-12 rounded-full items-center justify-center
                  ${isDarkMode ? "bg-blue-600/30" : "bg-blue-100"}`}
                            >
                                <task.icon
                                    className={`w-6 h-6 ${isDarkMode ? "text-blue-400" : "text-blue-600"
                                        }`}
                                />
                            </Flex>
                            <Box>
                                <Heading
                                    as="h3"
                                    size="md"
                                    className={`font-bold ${isDarkMode ? "text-white" : "text-gray-900"
                                        }`}
                                >
                                    {task.title}
                                </Heading>
                                <Text
                                    className={`text-xs font-medium mb-4 ${isDarkMode ? "text-blue-300" : "text-blue-600"
                                        }`}
                                >
                                    {task.purpose}
                                </Text>
                            </Box>
                        </Flex>

                        <VStack align="start" spacing={2}>
                            {task.examples.map((example, idx) => (
                                <Flex key={idx} align="start" gap={2}>
                                    <Box
                                        className={`w-2 h-2 rounded-full ${isDarkMode ? "bg-purple-400" : "bg-purple-600"
                                            }`}
                                    />
                                    <Text
                                        className={`text-xs md:text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"
                                            }`}
                                    >
                                        "{example}"
                                    </Text>
                                </Flex>
                            ))}
                        </VStack>
                    </Box>
                ))}
            </Grid>
        </Box>
    );
};

