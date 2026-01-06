import { motion } from "framer-motion";
import { fadeIn } from "../../../../utils/motion";
import { useTheme } from "../../../../contexts/ThemeContext";
import { Box, Heading, Text, Flex, Grid, Icon, Image } from "@chakra-ui/react";
import { FiUsers, FiHeart } from "react-icons/fi";
import heroImage1 from "../../../../assets/landing-page/hero-image-1.png";
import heroImage2 from "../../../../assets/landing-page/hero-image-2.png";
import heroImage3 from "../../../../assets/landing-page/hero-image-3.png";



export const CoreValuesSection = () => {
    const { isDarkMode } = useTheme();

    return (
        <Box
            as={motion.section}
            variants={fadeIn("up", 0.6)}
            initial="hidden"
            animate="show"
            mt={20}
            w="100%"
            px={{ base: 4, md: 6, lg: 8 }}
        >
            <Grid
                templateColumns={{ 
                    base: "1fr", 
                    md: "repeat(12, 1fr)" 
                }}
                templateRows={{ 
                    base: "auto auto auto auto auto auto", 
                    md: "auto auto auto" 
                }}
                gap={6}
                maxW="container.xl"
                mx="auto"
            >
                {/* Top Left - Large Image */}
                <Box
                    as={motion.div}
                    gridColumn={{ base: "1", md: "1 / 5" }}
                    gridRow={{ base: "1", md: "1 / 3" }}
                    variants={fadeIn("left", 0.2)}
                >
                    <Image
                        src={heroImage1}
                        alt="Healthcare professionals"
                        borderRadius="xl"
                        objectFit="cover"
                        w="100%"
                        h={{ base: "250px", md: "100%" }}
                        minH={{ md: "400px" }}
                    />
                </Box>

                {/* Bottom Left - Green Text Box */}
                <Box
                    as={motion.div}
                    gridColumn={{ base: "1", md: "1 / 5" }}
                    gridRow={{ base: "2", md: "3" }}
                    variants={fadeIn("left", 0.4)}
                    p={6}
                    borderRadius="xl"
                    bg="green.50"
                    borderWidth="1px"
                    borderColor="green.200"
                    _dark={{
                        bg: "green.900",
                        borderColor: "green.700",
                    }}
                >
                    <Text
                        fontSize={{ base: "sm", md: "md" }}
                        lineHeight="tall"
                        color={isDarkMode ? "gray.200" : "gray.700"}
                        mb={4}
                    >
                        We strive to build technology that supports families and caregivers - easing their burdens, 
                        providing insights into cognitive patterns, and enabling them to better support their loved ones. 
                        Given today's challenges with dementia care, caregiver burnout, and the need for personalized 
                        approaches, we work to help families not just manage, but thrive by delivering compassionate 
                        support that preserves dignity and strengthens connections.
                    </Text>
                    <Flex align="center" gap={3}>
                        <Flex
                            w={10}
                            h={10}
                            align="center"
                            justify="center"
                            rounded="full"
                            bg="white"
                            color="green.600"
                            shadow="sm"
                            _dark={{
                                bg: "gray.800",
                                color: "green.400",
                            }}
                        >
                            <Icon as={FiUsers} w={5} h={5} />
                        </Flex>
                        <Text
                            fontSize="sm"
                            fontWeight="semibold"
                            color={isDarkMode ? "gray.300" : "gray.700"}
                        >
                            To families & caregivers
                        </Text>
                    </Flex>
                </Box>

                {/* Center Top - Heading */}
                <Box
                    gridColumn={{ base: "1", md: "5 / 9" }}
                    gridRow={{ base: "3", md: "1" }}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    px={{ base: 0, md: 4 }}
                    py={{ base: 4, md: 0 }}
                >
                    <Heading
                        as="h2"
                        fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                        fontWeight="bold"
                        color={isDarkMode ? "white" : "gray.900"}
                        textAlign="center"
                    >
                        Our Commitment
                    </Heading>
                </Box>

                {/* Top Right - Purple Text Box */}
                <Box
                    as={motion.div}
                    gridColumn={{ base: "1", md: "9 / 13" }}
                    gridRow={{ base: "4", md: "1" }}
                    variants={fadeIn("right", 0.2)}
                    p={6}
                    borderRadius="xl"
                    bg="purple.50"
                    borderWidth="1px"
                    borderColor="purple.200"
                    _dark={{
                        bg: "purple.900",
                        borderColor: "purple.700",
                    }}
                >
                    <Text
                        fontSize={{ base: "sm", md: "md" }}
                        lineHeight="tall"
                        color={isDarkMode ? "gray.200" : "gray.700"}
                        mb={4}
                    >
                        We strive to build technology first and foremost for individuals living with dementia, 
                        with uncompromising compassion, dignity, and safety. Every person will have a trusted 
                        cognitive companion that safeguards their identity during their most vulnerable moments, 
                        preserves their memories, and keeps them connected to their personal stories, family, 
                        and daily routines at all times.
                    </Text>
                    <Flex align="center" gap={3}>
                        <Flex
                            w={10}
                            h={10}
                            align="center"
                            justify="center"
                            rounded="full"
                            bg="white"
                            color="purple.600"
                            shadow="sm"
                            _dark={{
                                bg: "gray.800",
                                color: "purple.400",
                            }}
                        >
                            <Icon as={FiHeart} w={5} h={5} />
                        </Flex>
                        <Text
                            fontSize="sm"
                            fontWeight="semibold"
                            color={isDarkMode ? "gray.300" : "gray.700"}
                        >
                            To individuals with dementia
                        </Text>
                    </Flex>
                </Box>

                {/* Bottom Center - Image */}
                <Box
                    as={motion.div}
                    gridColumn={{ base: "1", md: "5 / 9" }}
                    gridRow={{ base: "5", md: "2 / 4" }}
                    variants={fadeIn("up", 0.4)}
                >
                    <Image
                        src={heroImage3}
                        alt="Elderly person using technology"
                        borderRadius="xl"
                        objectFit="cover"
                        w="100%"
                        h={{ base: "250px", md: "100%" }}
                        minH={{ md: "300px" }}
                    />
                </Box>

                {/* Bottom Right - Image */}
                <Box
                    as={motion.div}
                    gridColumn={{ base: "1", md: "9 / 13" }}
                    gridRow={{ base: "6", md: "2 / 4" }}
                    variants={fadeIn("right", 0.4)}
                >
                    <Image
                        src={heroImage2}
                        alt="Elderly couple"
                        borderRadius="xl"
                        objectFit="cover"
                        w="100%"
                        h={{ base: "250px", md: "100%" }}
                        minH={{ md: "300px" }}
                    />
                </Box>
            </Grid>
        </Box>
    );
};

