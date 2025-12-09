import { motion } from "framer-motion";
import { fadeIn } from "../../../../utils/motion";
import { useTheme } from "../../../../contexts/ThemeContext";
import { Box, Heading, Text, Flex, Grid, VStack } from "@chakra-ui/react";

export const WhyTwinaraMattersSection = () => {
    const { isDarkMode } = useTheme();

    return (
        <Box
            as={motion.section}
            variants={fadeIn("up", 1.4)}
            initial="hidden"
            animate="show"
            mt={20}
        >
            <Heading
                as="h2"
                mb={9}
                className={`text-4xl md:text-5xl font-bold text-center mb-12 ${isDarkMode ? "text-white" : "text-gray-900"
                    }`}
            >
                Why Twinara Matters
            </Heading>

            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
                <Box
                    className={`p-8 rounded-2xl transition-all duration-500
              ${isDarkMode
                            ? "bg-gray-800/40 backdrop-blur-md border border-gray-700/50"
                            : "bg-white shadow-lg border border-gray-200"
                        }`}
                >
                    <Heading
                        as="h3"
                        className={`text-2xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                    >
                        For Users
                    </Heading>
                    <VStack align="start" spacing={4}>
                        {[
                            "Maintain identity",
                            "Strengthen relationships",
                            "Feel supported, not tested",
                            "Stay engaged with life",
                        ].map((item, index) => (
                            <Flex key={index} align="center" gap={3}>
                                <Box
                                    className={`w-2 h-2 rounded-full ${isDarkMode ? "bg-blue-400" : "bg-blue-600"
                                        }`}
                                />
                                <Text
                                    className={`text-base md:text-lg ${isDarkMode ? "text-gray-300" : "text-gray-700"
                                        }`}
                                >
                                    {item}
                                </Text>
                            </Flex>
                        ))}
                    </VStack>
                </Box>

                <Box
                    className={`p-8 rounded-2xl transition-all duration-500
              ${isDarkMode
                            ? "bg-gray-800/40 backdrop-blur-md border border-gray-700/50"
                            : "bg-white shadow-lg border border-gray-200"
                        }`}
                >
                    <Heading
                        as="h3"
                        className={`text-2xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                    >
                        For Caregivers
                    </Heading>
                    <VStack align="start" spacing={4}>
                        {[
                            "Reduce emotional burden",
                            "Improve engagement",
                            "Gain insight into user needs",
                            "Support daily care routines",
                        ].map((item, index) => (
                            <Flex key={index} align="center" gap={3}>
                                <Box
                                    className={`w-2 h-2 rounded-full ${isDarkMode ? "bg-purple-400" : "bg-purple-600"
                                        }`}
                                />
                                <Text
                                    className={`text-base md:text-lg ${isDarkMode ? "text-gray-300" : "text-gray-700"
                                        }`}
                                >
                                    {item}
                                </Text>
                            </Flex>
                        ))}
                    </VStack>
                </Box>
            </Grid>
        </Box>
    );
};

