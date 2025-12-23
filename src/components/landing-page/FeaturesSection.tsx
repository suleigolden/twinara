import { useTheme } from "../../contexts/ThemeContext";
import { motion } from "framer-motion";
import { Box, Heading, Text, Flex, Grid, Image } from "@chakra-ui/react";
import {
  Zap,
  Gauge,
  Users,
  Calendar,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import heroImage1 from "../../assets/landing-page/hero-image-1.png";

const FeaturesSection: React.FC = () => {
  // const { isDarkMode } = useTheme();
  const isDarkMode = false;
  const features = [
    {
      icon: <Zap size={24} strokeWidth={1.5} />,
      label: "Enhance",
      title: "Memory Recall",
    },
    {
      icon: <Gauge size={24} strokeWidth={1.5} />,
      label: "Improve",
      title: "Cognitive Function",
    },
    {
      icon: <Users size={24} strokeWidth={1.5} />,
      label: "Strengthen",
      title: "Family Connections",
    },
    {
      icon: <Calendar size={24} strokeWidth={1.5} />,
      label: "Support",
      title: "Daily Routines",
    },
    {
      icon: <TrendingUp size={24} strokeWidth={1.5} />,
      label: "Maintain",
      title: "Identity & Dignity",
    },
    {
      icon: <CheckCircle2 size={24} strokeWidth={1.5} />,
      label: "Provide",
      title: "Personalized Care",
    },
  ];

  return (
    <Box
      as="section"
      w="100%"
      py={{ base: 12, md: 20 }}
      px={{ base: 4, md: 6, lg: 8 }}
      bg={isDarkMode ? "gray.900" : "gray.50"}
    >
      <Flex
        direction={{ base: "column", lg: "row" }}
        gap={{ base: 8, lg: 12 }}
        maxW="container.xl"
        mx="auto"
      >
        {/* Left Side - Large Card with Image */}
        <motion.div
          style={{ flex: "1" }}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Box
            borderRadius="xl"
            overflow="hidden"
            bg={isDarkMode ? "gray.800" : "white"}
            boxShadow="xl"
            h="100%"
          >
            <Box p={8}>
              <Heading
                as="h2"
                fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                fontWeight="bold"
                mb={6}
                color={isDarkMode ? "white" : "gray.900"}
              >
                Why Families Choose Twinara
              </Heading>
              <Image
                src={heroImage1}
                alt="Twinara cognitive companion supporting individuals with dementia"
                borderRadius="lg"
                objectFit="cover"
                w="100%"
                h={{ base: "300px", md: "400px", lg: "500px" }}
              />
            </Box>
          </Box>
        </motion.div>

        {/* Right Side - Feature Cards Grid */}
        <motion.div
          style={{ flex: "1" }}
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
            gap={4}
            h="100%"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <Box
                  p={6}
                  borderRadius="xl"
                  bg={isDarkMode ? "gray.800" : "white"}
                  boxShadow="lg"
                  h="100%"
                  display="flex"
                  flexDirection="column"
                  _hover={{
                    boxShadow: "md",
                    transform: "translateY(-2px)",
                    transition: "all 0.2s",
                  }}
                >
                  <Box
                    mb={4}
                    color={isDarkMode ? "gray.300" : "gray.700"}
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                  >
                    {feature.icon}
                  </Box>
                  <Text
                    fontSize="sm"
                    color={isDarkMode ? "gray.400" : "gray.600"}
                    mb={1}
                    fontWeight="medium"
                  >
                    {feature.label}
                  </Text>
                  <Heading
                    as="h3"
                    fontSize={{ base: "lg", md: "xl" }}
                    fontWeight="bold"
                    color={isDarkMode ? "white" : "gray.900"}
                  >
                    {feature.title}
                  </Heading>
                </Box>
              </motion.div>
            ))}
          </Grid>
        </motion.div>
      </Flex>
    </Box>
  );
};

export default FeaturesSection;

