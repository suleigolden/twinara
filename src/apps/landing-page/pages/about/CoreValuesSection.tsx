import { motion } from "framer-motion";
import { fadeIn } from "../../../../utils/motion";
import { useTheme } from "../../../../contexts/ThemeContext";
import { Box, Heading, Text, Flex, Grid, Icon, useColorModeValue, VStack } from "@chakra-ui/react";
import { coreValues } from "./constants";

const featureColors = [
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

type FeatureProps = {
    title: string;
    text: string;
    icon: React.ElementType;
    colorScheme: (typeof featureColors)[0];
};

const Feature = ({ title, text, icon, colorScheme }: FeatureProps) => {
    const { isDarkMode } = useTheme();
    return (
        <Box
            as={motion.div}
            variants={fadeIn("up", 0.2 * 9)}
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
                w={12}
                h={12}
                align="center"
                justify="center"
                rounded="full"
                bg={useColorModeValue('white', 'gray.900')}
                color={useColorModeValue(colorScheme.icon, 'white')}
                shadow="md"
                mt={4}
            >
                <Icon as={icon} w={6} h={6} />
            </Flex>
            <Heading 
                mt={4}
                size="md" 
                className={`text-sm md:text-base leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}>
                {title}
            </Heading>
            <Text
                className={`text-sm md:text-base leading-relaxed ${isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
            >
                {text}
            </Text>
        </Box>
    );
};

export const CoreValuesSection = () => {
    const { isDarkMode } = useTheme();

    return (
        <Box
            as={motion.section}
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            animate="show"
            mt={20}
        >
            <Heading
                as="h2"
                className={`text-4xl md:text-5xl font-bold text-center mb-4 ${isDarkMode ? "text-white" : "text-gray-900"
                    }`}
            >
                Our Core Principles
            </Heading>
            <Text
                className={` ${isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                align="center"
                mb={12}
                mt={4}
            >
                Twinara is built on four core principles that guide every interaction
            </Text>

            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
                {coreValues.map((feature, index) => (
                    <Feature
                        key={index}
                        title={feature.title}
                        text={feature.description}
                        icon={feature.icon}
                        colorScheme={featureColors[index]}
                    />
                ))}
            </Grid>
        </Box>
    );
};

