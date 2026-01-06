import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";
import { Box, Heading, Text, Flex, Button, Container } from "@chakra-ui/react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "What is Twinara?",
    a: "Twinara is a cognitive companion designed to support individuals with dementia through personalized memory exercises and adaptive cognitive tasks. We create meaningful activities from your own life stories, helping preserve identity and maintain dignity.",
  },
  {
    q: "How does Twinara personalize cognitive tasks?",
    a: "Twinara uses your personal life stories and memories to create unique cognitive exercises. The platform adapts to your comfort level and cognitive abilities, ensuring tasks are always respectful, meaningful, and appropriately challenging.",
  },
  {
    q: "Is Twinara free to use?",
    a: "Yes! Twinara offers a free Individual plan with personalized cognitive tasks, daily memory exercises, and basic progress tracking. We also have a Family plan for $29/month that includes caregiver insights and multi-user access.",
  },
  {
    q: "Can family members and caregivers access the platform?",
    a: "Yes, with the Family plan, multiple family members can access Twinara. Caregivers receive insights and reports to better understand cognitive patterns and support their loved ones effectively.",
  },
  {
    q: "Is my personal information and data secure?",
    a: "Absolutely. Privacy is our top priority. Twinara uses a privacy-first design with secure data encryption. Your personal stories and cognitive data are protected and never shared without your explicit consent.",
  },
  {
    q: "How do I get started with Twinara?",
    a: "Getting started is simple! Sign up for a free account, share some of your life stories, and Twinara will begin creating personalized cognitive tasks tailored just for you. No credit card required for the Individual plan.",
  },
];

const bulbs = [
  { size: 60, x: "10%", y: "15%", color: "#F87171" },
  { size: 40, x: "70%", y: "10%", color: "#FBBF24" },
  { size: 50, x: "30%", y: "70%", color: "#60A5FA" },
  { size: 35, x: "80%", y: "60%", color: "#34D399" },
  { size: 45, x: "50%", y: "30%", color: "#A78BFA" },
];

const FAQ: React.FC = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => setOpenIndex(openIndex === index ? null : index);

  const bgGlass = isDarkMode
    ? "bg-gray-900/60 backdrop-blur-lg text-white border border-gray-700/50 shadow-xl"
    : "bg-white/60 backdrop-blur-lg text-gray-900 border border-gray-200/50 shadow-lg";

  return (
    <Box
      as="section"
      className={`relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-500`}
    >
      {bulbs.map((b, i) => (
        <Box
          key={i}
          className="absolute rounded-full z-0"
          style={{
            width: b.size * 1.5,
            height: b.size * 1.5,
            top: b.y,
            left: b.x,
            background: b.color,
            filter: "blur(40px)",
            opacity: 0.6,
            mixBlendMode: isDarkMode ? "screen" : "multiply",
          }}
        />
      ))}

      <Box className="relative z-10 max-w-4xl mx-auto text-center mb-16">
        <Heading
          as="h2"
          className={`text-3xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${
            isDarkMode
              ? "from-white via-blue-300 to-white"
              : "from-blue-800 via-indigo-400 to-blue-800"
          }`}
        >
          Frequently Asked Questions
        </Heading>
        <Text
          className={`${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          } text-lg`}
        >
          Find answers to common questions about Twinara. Click on any question to learn more.
        </Text>
      </Box>

      <Box className="relative max-w-4xl mx-auto z-10">
        <Box
          className={`absolute left-5 top-0 bottom-0 w-1 ${
            isDarkMode ? "bg-gray-700" : "bg-gray-300"
          } rounded-full`}
        ></Box>

        {faqs.map((faq, i) => (
          <motion.div 
            key={i} 
            className="relative flex items-start mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <motion.div
              className={`flex-shrink-0 w-10 h-10 rounded-full ${
                isDarkMode ? "bg-blue-500" : "bg-indigo-500"
              } flex items-center justify-center text-white font-bold z-10`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                backgroundColor: openIndex === i 
                  ? (isDarkMode ? "#10B981" : "#059669")
                  : (isDarkMode ? "#3B82F6" : "#6366F1"),
                boxShadow: openIndex === i
                  ? "0 0 20px rgba(16, 185, 129, 0.6)"
                  : "0 0 10px rgba(59, 130, 246, 0.3)"
              }}
              transition={{ duration: 0.3 }}
            >
              {i + 1}
            </motion.div>

            <Box className="ml-6 flex-1">
              <motion.div
                onClick={() => toggle(i)}
                className={`p-5 rounded-2xl border transition-all duration-500 ${bgGlass} cursor-pointer group`}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: isDarkMode 
                    ? "0 20px 40px rgba(0,0,0,0.4)" 
                    : "0 20px 40px rgba(0,0,0,0.15)"
                }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  borderColor: openIndex === i
                    ? (isDarkMode ? "#10B981" : "#059669")
                    : (isDarkMode ? "rgba(75, 85, 99, 0.5)" : "rgba(229, 231, 235, 0.5)")
                }}
                transition={{ duration: 0.3 }}
              >
                <Flex className="justify-between items-center">
                  <Heading as="h3" size="md" className="font-semibold text-md pr-4">{faq.q}</Heading>
                  
                  <motion.div
                    className="flex-shrink-0"
                    animate={{ 
                      rotate: openIndex === i ? 45 : 0,
                      scale: openIndex === i ? 1.1 : 1
                    }}
                    transition={{ 
                      type: "spring",
                      stiffness: 200,
                      damping: 15
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {openIndex === i ? (
                        <Minus size={24} className="text-green-500" />
                      ) : (
                        <Plus size={24} className="text-blue-500" />
                      )}
                    </motion.div>
                  </motion.div>
                </Flex>
              </motion.div>

              <AnimatePresence mode="wait">
                {openIndex === i && (
                  <motion.div
                    initial={{ 
                      opacity: 0, 
                      height: 0,
                      y: -10,
                      scale: 0.95
                    }}
                    animate={{ 
                      opacity: 1, 
                      height: "auto",
                      y: 0,
                      scale: 1
                    }}
                    exit={{ 
                      opacity: 0, 
                      height: 0,
                      y: -10,
                      scale: 0.95
                    }}
                    transition={{ 
                      duration: 0.5,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className="overflow-hidden"
                  >
                    <motion.div
                      className={`mt-4 p-4 rounded-xl ${
                        isDarkMode 
                          ? "bg-gray-800/60 backdrop-blur-sm border border-gray-700/30" 
                          : "bg-white/80 backdrop-blur-sm border border-gray-200/50"
                      } shadow-lg`}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0 }}
                      transition={{ 
                        duration: 0.4,
                        delay: 0.1,
                        ease: "easeOut"
                      }}
                    >
                      <motion.p
                        className={`${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        } leading-relaxed`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        {faq.a}
                      </motion.p>
                      
                      <motion.div
                        className={`mt-3 h-0.5 rounded-full bg-gradient-to-r ${
                          isDarkMode 
                            ? "from-green-400 to-blue-500" 
                            : "from-green-500 to-blue-600"
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>
          </motion.div>
        ))}
      </Box>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className={`max-w-4xl mx-auto mt-16 p-10 rounded-3xl flex flex-col sm:flex-row justify-between items-center gap-6 ${bgGlass}`}
      >
        <Box>
          <Heading as="h3" className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-blue-500">
            Need more help?
          </Heading>
          <Text
            className={`${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            } text-sm`}
          >
            Our compassionate team is here to support you and your family. Reach out anytime.
          </Text>
        </Box>
        <Flex className="gap-4 flex-col sm:flex-row">
          <Button
            as={motion.button}
            onClick={() => navigate("/")}
            className={`
              relative overflow-hidden px-6 py-3 rounded-xl font-semibold text-white 
              bg-gradient-to-r from-blue-600 to-blue-500
              backdrop-blur-md shadow-lg shadow-blue-500/30
              border border-blue-400/30
              transition-all duration-300 group
            `}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <Text as="span" className="relative flex items-center gap-2">
              Get Started Free
              <motion.svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                initial={{ x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </motion.svg>
            </Text>
          </Button>

          <Button
            as={motion.button}
            onClick={() => navigate("/")}
            className={`px-6 py-3 rounded-xl border font-semibold transition-all duration-300 ${
              isDarkMode
                ? "border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white"
                : "border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
            whileHover={{ 
              scale: 1.05,
            }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Support
          </Button>
        </Flex>
      </motion.div>
    </Box>
  );
};

export default FAQ;

