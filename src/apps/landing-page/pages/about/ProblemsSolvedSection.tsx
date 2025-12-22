import { motion } from "framer-motion";
import { fadeIn } from "../../../../utils/motion";
import { useTheme } from "../../../../contexts/ThemeContext";
import { Box, Heading, Text, Grid, Flex, Icon, useColorModeValue } from "@chakra-ui/react";
import { problemsSolved } from "./constants";
import { 
    FiUser, 
    FiHeart, 
    FiLayers, 
    FiUsers, 
    FiClock, 
    FiMessageCircle 
} from "react-icons/fi";

const problemColors = [
    {
        bg: 'blue.50',
        hover: 'blue.100',
        icon: 'blue.500',
        border: 'blue.200',
    },
    {
        bg: 'purple.50',
        hover: 'purple.100',
        icon: 'purple.500',
        border: 'purple.200',
    },
    {
        bg: 'teal.50',
        hover: 'teal.100',
        icon: 'teal.500',
        border: 'teal.200',
    },
    {
        bg: 'pink.50',
        hover: 'pink.100',
        icon: 'pink.500',
        border: 'pink.200',
    },
    {
        bg: 'green.50',
        hover: 'green.100',
        icon: 'green.500',
        border: 'green.200',
    },
    {
        bg: 'orange.50',
        hover: 'orange.100',
        icon: 'orange.500',
        border: 'orange.200',
    },
];

const problemIcons = [FiUser, FiHeart, FiLayers, FiUsers, FiClock, FiMessageCircle];

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

            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                {problemsSolved.map((item, index) => {
                    const ProblemIcon = problemIcons[index];
                    const colorScheme = problemColors[index];
                    return (
                        <Box
                            as={motion.div}
                            key={index}
                            variants={fadeIn("up", 0.2 * index)}
                            className={`p-6 md:p-8 rounded-2xl transition-all duration-500 hover:scale-[1.02]
                                ${isDarkMode
                                    ? "bg-gray-800/40 backdrop-blur-md border border-gray-700/50"
                                    : "bg-white shadow-lg border border-gray-200"
                                }`}
                            borderTopLeftRadius={{ lg: '100px', xl: '100px' }}
                            borderBottomRightRadius={{ lg: '100px', xl: '100px' }}
                            bg={!isDarkMode ? useColorModeValue(colorScheme.bg, 'gray.800') : ''}
                            borderColor={useColorModeValue(colorScheme.border, 'gray.700')}
                            _hover={{
                                transform: 'translateY(-5px)',
                                shadow: 'lg',
                                bg: useColorModeValue(colorScheme.hover, 'gray.700'),
                            }}
                        >
                            <Flex
                                align="flex-start"
                                gap={4}
                                mt={4}
                            >
                                <Flex
                                    w={12}
                                    h={12}
                                    align="center"
                                    justify="center"
                                    rounded="full"
                                    bg={useColorModeValue('white', 'gray.900')}
                                    color={useColorModeValue(colorScheme.icon, 'white')}
                                    shadow="md"
                                    flexShrink={0}
                                >
                                    <Icon as={ProblemIcon} w={6} h={6} />
                                </Flex>
                                <Text
                                    className={`text-sm md:text-base leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"
                                        }`}
                                >
                                    {item.problem}. {item.solution}
                                </Text>
                            </Flex>
                        </Box>
                    );
                })}
            </Grid>
        </Box>
    );
};

