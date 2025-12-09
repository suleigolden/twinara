import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { fadeIn } from "../../utils/motion";
import { Box, Heading, Text, Button, Grid, List, ListItem, Container, Flex } from "@chakra-ui/react";

const PricingSection: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [productCount] = useState(1);
  
  const calculatePrice = (basePrice: number, productCount: number) =>
    Math.round(basePrice * (productCount / 50));

  const starterPrice = calculatePrice(4000, productCount);
  const businessPrice = calculatePrice(7500, productCount);

  const plans = [
    {
      name: "Starter",
      price: starterPrice,
      features: [
        "Up to 10 users",
        "Email support",
        "Basic analytics dashboard",
        "Access to community forum",
        "Standard security features",
        "Weekly performance reports",
      ],
    },
    {
      name: "Business",
      price: businessPrice,
      features: [
        "Unlimited users",
        "Priority email & chat support",
        "Advanced analytics & custom reports",
        "Team collaboration tools",
        "Multiple project workspaces",
        "Daily performance insights",
      ],
    },
  ];

  const handleUpcomingFeature = () => {
    console.log("⚒️ This feature is coming soon! Stay tuned for updates.");
  };

  return (
    <motion.section
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      className={`relative py-20 px-4 overflow-hidden transition-colors duration-300`}
    >
      <Container maxW="7xl" className="relative z-10">
        <Box className="text-center mb-10">
          <Heading
            as="h2"
            className={`text-4xl md:text-6xl font-bold mb-3 ${
              isDarkMode ? "text-blue-300" : "text-blue-700"
            }`}
          >
            Pricing Plans
          </Heading>
          <Text
            className={`text-lg max-w-xl mx-auto ${
              isDarkMode ? "text-gray-300" : "text-gray-500"
            }`}
          >
            Choose the perfect plan for your needs. Upgrade or downgrade at any time.
          </Text>
        </Box>

        <motion.div
          variants={fadeIn("up", 0.4)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px", amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut", staggerChildren: 0.2 }}
          className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto relative z-20"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={fadeIn("up", 0.2)}
              className={`relative group overflow-hidden rounded-3xl p-8 flex flex-col gap-6 items-start transition-all duration-300 ease-out ${
                isDarkMode
                  ? "bg-black/20 backdrop-blur-xl text-white border border-white/8 hover:bg-black/30 hover:shadow-purple-900/40"
                  : "bg-white/20 backdrop-blur-xl text-gray-900 border border-white/30 hover:bg-white/10 hover:shadow-purple-500/20"
              } shadow-2xl hover:-translate-y-2 hover:scale-[1.02]`}
            >
              <span
                className={`inline-flex items-center text-sm font-medium px-4 py-2 rounded-full mb-6 transition-all duration-300 ease-out backdrop-blur-xl ${
                  isDarkMode
                    ? "bg-black/15 border border-white/10 text-blue-200 shadow-lg shadow-black/30"
                    : "bg-white/[0.25] border border-white/30 text-blue-700 shadow-md"
                }`}
              >
                {plan.name}
              </span>

              <Box className="mb-8">
                <Flex className={`items-baseline gap-2 ${isDarkMode ? "text-white" : "text-gray-800"}`}>
                  <Text className={`text-4xl font-bold bg-gradient-to-r ${isDarkMode ? "from-blue-400 to-cyan-400" : "from-blue-600 to-cyan-600"} bg-clip-text text-transparent`}>
                    ${plan.price}
                  </Text>
                  <Text className={`text-lg font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    /month
                  </Text>
                </Flex>
                <Text className={`text-sm mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                  Billed monthly
                </Text>
              </Box>

              <Box className="mb-8 flex-grow">
                <Heading as="h4" className={`text-sm font-semibold mb-4 uppercase tracking-wider ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  What's included
                </Heading>
                <List className="space-y-3">
                  {plan.features.map((feat, index) => (
                    <ListItem
                      as={motion.li}
                      key={feat}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{ 
                        delay: index * 0.08, 
                        duration: 0.4, 
                        ease: "easeOut" 
                      }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle
                        className={`w-5 h-5 mt-0.5 flex-shrink-0 transition-colors duration-200 ${
                          isDarkMode ? "text-blue-400" : "text-blue-600"
                        }`}
                      />
                      <Text className={`text-sm leading-relaxed ${
                        isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}>
                        {feat}
                      </Text>
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Button
                onClick={handleUpcomingFeature}
                className={`w-full py-3 px-6 rounded-xl font-semibold relative overflow-hidden transition-all duration-300 ease-out backdrop-blur-xl ${
                  isDarkMode
                    ? "bg-black/15 hover:bg-black/25 text-white border border-white/10 shadow-lg"
                    : "bg-white/[0.20] hover:bg-white/[0.30] text-gray-800 border border-white/25 shadow-md"
                } hover:scale-[1.02] hover:shadow-xl active:scale-98 transform cursor-pointer`}
              >
                <Text as="span" className="relative z-10 flex items-center justify-center gap-2">
                  Choose Plan
                  <Text as={motion.span}
                    initial={{ x: 0 }}
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    →
                  </Text>
                </Text>
              </Button>
            </motion.div>
          ))}
        </motion.div>

        <Box
          as={motion.div}
          variants={fadeIn("up", 0.6)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="text-center mt-16"
        >
          <Text className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
            All plans include a 14-day free trial. No credit card required.
          </Text>
        </Box>
      </Container>
    </motion.section>
  );
};

export default PricingSection;

