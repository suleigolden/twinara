import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { fadeIn } from "../../utils/motion";
import { Box, Heading, Text, List, Container, Flex } from "@chakra-ui/react";

const PricingSection: React.FC = () => {
  const { isDarkMode } = useTheme();

  const plans = [
    {
      name: "Individual",
      price: 0,
      features: [
        "Personalized cognitive tasks",
        "Daily memory exercises",
        "Adaptive difficulty levels",
        "Basic progress tracking",
        "Email support",
        "Privacy-first design",
      ],
    },
    {
      name: "Family",
      price: 29,
      features: [
        "Everything in Individual",
        "Multiple family member access",
        "Caregiver insights & reports",
        "Relationship-focused tasks",
        "Priority support",
        "Advanced progress analytics",
      ],
    },
  ];


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
            Simple, Transparent Pricing
          </Heading>
          <Text
            className={`text-base md:text-lg  mx-auto ${
              isDarkMode ? "text-gray-300" : "text-gray-500"
            }`}
          >
            Start your cognitive journey today. Free for individuals, affordable for families.
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
                  {plan.price === 0 ? (
                    <Text className={`text-4xl font-bold bg-gradient-to-r ${isDarkMode ? "from-blue-400 to-cyan-400" : "from-blue-600 to-cyan-600"} bg-clip-text text-transparent`}>
                      Free
                    </Text>
                  ) : (
                    <>
                      <Text className={`text-4xl font-bold bg-gradient-to-r ${isDarkMode ? "from-blue-400 to-cyan-400" : "from-blue-600 to-cyan-600"} bg-clip-text text-transparent`}>
                        ${plan.price}
                      </Text>
                      <Text className={`text-lg font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                        /month
                      </Text>
                    </>
                  )}
                </Flex>
                {plan.price > 0 && (
                  <Text className={`text-sm mt-1 ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    Billed monthly
                  </Text>
                )}
              </Box>

              <Box className="mb-8 flex-grow">
                <List className="space-y-3">
                  {plan.features.map((feat, index) => (
                    <motion.li
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
                    </motion.li>
                  ))}
                </List>
              </Box>

            </motion.div>
          ))}
        </motion.div>

      </Container>
    </motion.section>
  );
};

export default PricingSection;

