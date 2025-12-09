import { motion } from "framer-motion";
import { fadeIn } from "../../../../utils/motion";
import { Link } from "react-router-dom";
import { useTheme } from "../../../../contexts/ThemeContext";
import { Box, Heading, Text, Button, HStack } from "@chakra-ui/react";

export const FinalSummaryCTA = () => {
    const { isDarkMode } = useTheme();

    return (
        <Box
            as={motion.section}
            variants={fadeIn("up", 1.6)}
            initial="hidden"
            animate="show"
            mt={20}
        >
            <Box
                className={`text-center p-8 md:p-12 rounded-3xl ${isDarkMode
                    ? "bg-gradient-to-br from-blue-900/40 to-purple-900/40 backdrop-blur-md border border-gray-700/50"
                    : "bg-gradient-to-br from-blue-50 to-purple-50 shadow-xl border border-gray-200"
                    }`}
            >
                <Heading
                    as="h2"
                    className={`text-3xl md:text-4xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                >
                    Twinara: Supporting the Person, Not Just the Condition
                </Heading>
                <Text
                    className={`text-lg md:text-xl mb-8 max-w-3xl mx-auto leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                >
                    Twinara combines AI, human empathy, personal memory, and ethical design into a system that supports individuals living with dementia with dignity, respect, and personalized care.
                </Text>
                <HStack spacing={4} justify="center" flexWrap="wrap">
                    <Button
                        as={Link}
                        to="/"
                        size="lg"
                        className={`${isDarkMode
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                    >
                        Get Started
                    </Button>
                    <Button
                        as={Link}
                        to="/#faq"
                        size="lg"
                        variant="outline"
                        className={`${isDarkMode
                            ? "border-gray-600 text-gray-300 hover:bg-gray-800"
                            : "border-gray-300 text-gray-700 hover:bg-gray-50"
                            }`}
                    >
                        Learn More
                    </Button>
                </HStack>
            </Box>
        </Box>
    );
};

