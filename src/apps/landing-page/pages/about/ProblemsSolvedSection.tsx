import { motion } from "framer-motion";
import { fadeIn } from "../../../../utils/motion";
import { useTheme } from "../../../../contexts/ThemeContext";
import { Box, Heading, Text, Grid } from "@chakra-ui/react";
import { problemsSolved } from "./constants";

export const ProblemsSolvedSection = () => {
    const { isDarkMode } = useTheme();

    return (
        <Box
            as={motion.section}
            variants={fadeIn("up", 0.8)}
            initial="hidden"
            animate="show"
            mt={20}
        >
            <Heading
                as="h2"
                className={`text-4xl md:text-5xl font-bold text-center mb-4 ${isDarkMode ? "text-white" : "text-gray-900"
                    }`}
            >
                How Twinara Helps
            </Heading>
            <Text
                className={`text-base md:text-lg text-center mx-auto mb-12 ${isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                align="center"
                mb={12}
            >
                Addressing real challenges faced by individuals with dementia and their caregivers
            </Text>

            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
                {problemsSolved.map((item, index) => (
                    <Box
                        as={motion.div}
                        key={index}
                        variants={fadeIn("up", 0.2 * index)}
                        className={`p-6 rounded-xl transition-all duration-500
                ${isDarkMode
                                ? "bg-gray-800/40 backdrop-blur-md border border-gray-700/50"
                                : "bg-white shadow-md border border-gray-200"
                            }`}
                    >
                        <Text
                            className={`text-sm font-semibold mb-3 ${isDarkMode ? "text-blue-400" : "text-blue-600"
                                }`}
                        >
                            Problem
                        </Text>
                        <Text
                            className={`text-base font-medium mb-4 ${isDarkMode ? "text-white" : "text-gray-900"
                                }`}
                        >
                            {item.problem}
                        </Text>
                        <Text
                            className={`text-xs font-semibold mb-2 ${isDarkMode ? "text-green-400" : "text-green-600"
                                }`}
                        >
                            Solution
                        </Text>
                        <Text
                            className={`text-sm leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"
                                }`}
                        >
                            {item.solution}
                        </Text>
                    </Box>
                ))}
            </Grid>
        </Box>
    );
};

