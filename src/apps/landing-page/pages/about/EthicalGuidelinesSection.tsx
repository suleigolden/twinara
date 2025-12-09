import { motion } from "framer-motion";
import { fadeIn } from "../../../../utils/motion";
import { useTheme } from "../../../../contexts/ThemeContext";
import { FiShield, FiCheckCircle } from "react-icons/fi";
import { Box, Heading, Text, Flex, Grid, VStack } from "@chakra-ui/react";

export const EthicalGuidelinesSection = () => {
    const { isDarkMode } = useTheme();

    return (
        <Box
            as={motion.section}
            variants={fadeIn("up", 1.2)}
            initial="hidden"
            animate="show"
            mt={20}
        >
            <Box
                className={`p-8 md:p-12 rounded-3xl transition-all duration-500
        ${isDarkMode
                        ? "bg-gray-800/40 backdrop-blur-md border border-gray-700/50"
                        : "bg-white shadow-lg border border-gray-200"
                    }`}
            >
                <Heading
                    as="h2"
                    className={`text-3xl md:text-4xl font-bold mb-8 text-center ${isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                >
                    Ethical & Safety Guidelines
                </Heading>

                <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
                    <Box>
                        <Heading
                            as="h3"
                            className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDarkMode ? "text-red-400" : "text-red-600"
                                }`}
                        >
                            <FiShield className="w-5 h-5" />
                            Twinara will never:
                        </Heading>
                        <VStack align="start" spacing={3}>
                            {[
                                "Pretend to be a real person",
                                "Replace human care",
                                "Give medical advice",
                                "Diagnose conditions",
                                "Encourage unsafe actions",
                            ].map((item, index) => (
                                <Flex key={index} align="center" gap={3}>
                                    <Text
                                        as="span"
                                        className={`text-red-500 ${isDarkMode ? "text-red-400" : "text-red-600"}`}
                                    >
                                        ✗
                                    </Text>
                                    <Text
                                        className={`text-sm md:text-base ${isDarkMode ? "text-gray-300" : "text-gray-700"
                                            }`}
                                    >
                                        {item}
                                    </Text>
                                </Flex>
                            ))}
                        </VStack>
                    </Box>

                    <Box>
                        <Heading
                            as="h3"
                            className={`text-xl font-bold mb-4 flex items-center gap-2 ${isDarkMode ? "text-green-400" : "text-green-600"
                                }`}
                        >
                            <FiCheckCircle className="w-5 h-5" />
                            Twinara will always:
                        </Heading>
                        <VStack align="start" spacing={3}>
                            {[
                                "Encourage contacting caregivers when confused",
                                "Be honest and transparent",
                                "Respect emotional boundaries",
                                "Maintain user dignity",
                                "Support, never test",
                            ].map((item, index) => (
                                <Flex key={index} align="center" gap={3}>
                                    <Text
                                        as="span"
                                        className={`${isDarkMode ? "text-green-400" : "text-green-600"}`}
                                    >
                                        ✓
                                    </Text>
                                    <Text
                                        className={`text-sm md:text-base ${isDarkMode ? "text-gray-300" : "text-gray-700"
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
        </Box>
    );
};

