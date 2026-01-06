import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn, textVariant } from "../../../utils/motion";
import { useTheme } from "../../../contexts/ThemeContext";
import {
    Box,
    Heading,
    Text,
    Container,
} from "@chakra-ui/react";
import { Navbar } from "../Navbar";
import {
    WhatIsTwinaraSection,
    CoreValuesSection,
    ProblemsSolvedSection,
    CognitiveTaskCategoriesSection,
    EthicalGuidelinesSection,
    WhyTwinaraMattersSection,
    FinalSummaryCTA,
} from "./about/index";

const AboutUs = () => {
    const { isDarkMode } = useTheme();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const [bulbs, setBulbs] = useState<Array<{
        color: string;
        size: string;
        top: string;
        left: string;
        blur: string;
        opacity: number;
    }>>([]);

    useEffect(() => {
        window.scrollTo(0, 0);

        if (isDarkMode) {
            const colors = ["#F472B6", "#60A5FA", "#A78BFA", "#ff6f82ff", "#34D399"];
            const newBulbs = [];
            for (let i = 0; i < 15; i++) {
                const color = colors[Math.floor(Math.random() * colors.length)];
                const size = `${50 + Math.random() * 100}px`;
                const top = `${Math.random() * 100}%`;
                const left = `${Math.random() * 100}%`;
                const blur = `${20 + Math.random() * 20}px`;
                const opacity = 0.1 + Math.random() * 0.1;
                newBulbs.push({ color, size, top, left, blur, opacity });
            }
            setBulbs(newBulbs);
        }
    }, [isDarkMode]);

    return (
        <Box
            className={`min-h-screen pt-24 pb-16 transition-colors duration-500 relative overflow-hidden
  ${isDarkMode
                    ? "bg-gray-900 bg-opacity-70 backdrop-blur-xl"
                    : "bg-gradient-to-br from-white via-blue-50 to-purple-50"
                }`}
        >
            <Navbar />
            {isDarkMode &&
                bulbs.map((b, i) => {
                    const bulb = b as { color: string; size: string; top: string; left: string; blur: string; opacity: number };
                    return (
                        <Box
                            key={i}
                            className="absolute rounded-full"
                            style={{
                                width: bulb.size,
                                height: bulb.size,
                                top: bulb.top,
                                left: bulb.left,
                                backgroundColor: bulb.color,
                                filter: `blur(${bulb.blur})`,
                                opacity: bulb.opacity,
                            }}
                        />
                    );
                })}

            {/* Header Section */}
            <Container maxW="7xl" py={12}>
                <Box
                    as={motion.section}
                    variants={fadeIn("up", 0.2)}
                    initial="hidden"
                    animate="show"
                    className="text-center"
                >
                    <Box as={motion.div} variants={textVariant(0.3)} className="max-w-4xl mx-auto">
                        <Heading
                            as="h1"
                            size="2xl"
                            mb={6}
                            className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mt-8 relative inline-block ${isDarkMode ? "text-white" : "text-gray-900"
                                }`}
                        >
                            About Twinara
                        </Heading>

                        <Text
                            className={`text-lg md:text-xl max-w-3xl mt-10 text-center mx-auto ${
                                isDarkMode ? "text-gray-300" : "text-gray-700"
                            }`}
                        >
                            A Personalized Cognitive Companion for Dementia Support
                        </Text>
                    </Box>
                </Box>

                {/* What is Twinara Section */}
                <WhatIsTwinaraSection />

                {/* Core Values Section */}
                <CoreValuesSection />

                {/* Problems Solved Section */}
                <ProblemsSolvedSection />

                {/* Cognitive Task Categories Section */}
                <CognitiveTaskCategoriesSection />

                {/* Ethical Guidelines Section */}
                <EthicalGuidelinesSection />

                {/* Why Twinara Matters Section */}
                <WhyTwinaraMattersSection />

                {/* Final Summary CTA */}
                <FinalSummaryCTA />
            </Container>
        </Box>
    );
};

export default AboutUs;
