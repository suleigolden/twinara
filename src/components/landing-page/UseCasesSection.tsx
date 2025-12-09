import { motion } from "framer-motion";
import { Brain, Heart, Cpu, Zap, CheckCircle, ArrowRight, Star, BookOpen, MessageCircle } from "lucide-react";
import { useTheme } from "../../contexts/ThemeContext";
import { Box, Heading, Text, Button, Flex, Grid, Container } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const UseCasesSection: React.FC = () => {
  const { isDarkMode } = useTheme();


  const features = [
    {
      icon: Brain,
      title: "Personalized Tasks",
      description: "Based on your life stories and memories"
    },
    {
      icon: Cpu,
      title: "Adaptive Difficulty",
      description: "Adjusts to your cognitive level automatically"
    },
    {
      icon: Heart,
      title: "Gentle Support",
      description: "Always encouraging, never judgmental"
    }
  ];

  const benefits = [
    "Preserve dignity with adaptive, respectful communication with Twinara",
    "Maintain identity through personalized memory exercises",
    "Strengthen family relationships with relationship-focused tasks",
    "Reduce anxiety with gentle, non-judgmental interactions",
    "Improve routine awareness with daily activity reinforcement",
    "Increase engagement through meaningful, real-life content",
    "Support caregivers with insights into cognitive patterns",
  ];

  return (
    <Box as="section" className={`relative overflow-hidden bg-transparent`}>
      <Box className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -25, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-20 h-20 bg-gradient-to-r from-blue-200/10 to-purple-200/10 rounded-full blur-xl"
        />
        <motion.div
          animate={{
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-16 h-16 bg-gradient-to-r from-orange-200/10 to-pink-200/10 rounded-full blur-xl"
        />
      </Box>

      <Container id="use-cases" maxW="7xl" className="relative px-4 py-12">
        <Grid className="lg:grid-cols-2 gap-8 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${
                isDarkMode
                  ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-200/30 text-blue-300'
                  : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-200/50 text-blue-700'
              }`}
            >
              <Zap className={`w-4 h-4 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <span className="font-semibold text-sm">PERSONALIZED COGNITIVE CARE</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              <Heading as="h2" className={`relative text-3xl lg:text-4xl font-bold leading-tight inline-block ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-slate-200 via-blue-200 to-indigo-200 bg-clip-text text-transparent'
                  : 'bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent'
              }`}>
                How Twinara
                <br />
                <Text as="span" className="bg-clip-text text-transparent">
                  Supports You Daily
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full origin-left"
                  />
                </Text>
              </Heading>
              <Text className={`text-lg leading-relaxed ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                Personalized cognitive tasks, gentle memory exercises, and supportive interactions designed to help you maintain your identity and strengthen relationships.
              </Text>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-3"
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-3 group"
                >
                  <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <Text className={`font-medium ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-700'
                  }`}>{benefit}</Text>
                </motion.div>
              ))}
            </motion.div>

          

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className={`relative backdrop-blur-xl rounded-2xl p-6 shadow-xl border ${
                isDarkMode
                  ? 'bg-slate-800/80 border-slate-700/50'
                  : 'bg-white/80 border-gray-200/20'
              }`}
            >
              <Flex className="items-center justify-between mb-4">
                <Box>
                  <Heading as="h3" className={`text-lg font-bold ${
                    isDarkMode ? 'text-slate-100' : 'text-slate-800'
                  }`}>Today's Memory Moments</Heading>
                  <Text className={`text-sm ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>Personalized Cognitive Tasks</Text>
                </Box>
                <Flex className={`items-center gap-2 px-2 py-1 rounded-full text-xs font-medium ${
                  isDarkMode
                    ? 'bg-green-900/50 text-green-300 border border-green-700/50'
                    : 'bg-green-100 text-green-700'
                }`}>
                  <Box className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <Text>Active</Text>
                </Flex>
              </Flex>

              <Box className="space-y-2">
                {[
                  { time: "Morning", task: "Identity Recall", type: "What is your name?" },
                  { time: "Afternoon", task: "Family Memory", type: "Who is Sarah to you?" },
                  { time: "Evening", task: "Routine Awareness", type: "What do you do on Mondays?" },
                  { time: "Anytime", task: "Story Sharing", type: "Tell me about gardening" },
                ].map((session, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className={`flex items-center gap-3 p-3 rounded-xl hover:shadow-sm transition-all cursor-pointer group ${
                      isDarkMode
                        ? 'bg-gradient-to-r from-slate-700/50 to-blue-900/30'
                        : 'bg-gradient-to-r from-slate-50 to-blue-50/50'
                    }`}
                  >
                    <Text className={`font-semibold text-sm min-w-[60px] ${
                      isDarkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>
                      {session.time}
                    </Text>
                    <Box className="flex-1">
                      <Text className={`font-medium text-sm ${
                        isDarkMode ? 'text-slate-100' : 'text-slate-800'
                      }`}>{session.task}</Text>
                      <Text className={`text-xs ${
                        isDarkMode ? 'text-slate-400' : 'text-slate-500'
                      }`}>{session.type}</Text>
                    </Box>
                    <Box className={`w-2 h-2 rounded-full ${
                      isDarkMode ? 'bg-green-400' : 'bg-green-400'
                    }`} />
                  </motion.div>
                ))}
              </Box>

              <Flex className={`gap-4 mt-4 pt-4 border-t ${
                isDarkMode ? 'border-slate-600' : 'border-slate-100'
              }`}>
                <Box className="flex-1 text-center">
                  <Text className={`font-bold ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>Daily</Text>
                  <Text className={`text-xs ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>Tasks</Text>
                </Box>
                <Box className="flex-1 text-center">
                  <Text className={`font-bold ${
                    isDarkMode ? 'text-green-400' : 'text-green-600'
                  }`}>95%</Text>
                  <Text className={`text-xs ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>Engagement</Text>
                </Box>
                <Box className="flex-1 text-center">
                  <Text className={`font-bold ${
                    isDarkMode ? 'text-orange-400' : 'text-orange-600'
                  }`}>Adaptive</Text>
                  <Text className={`text-xs ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>Difficulty</Text>
                </Box>
              </Flex>
            </motion.div>

            <Flex className="flex-wrap gap-3 mt-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className={`flex items-center gap-2 backdrop-blur-lg rounded-full px-4 py-2 transition-all cursor-pointer group ${
                    isDarkMode
                      ? 'bg-slate-700/70 hover:bg-slate-600/90'
                      : 'bg-white/70 hover:bg-white/90'
                  }`}
                >
                  <feature.icon className={`w-4 h-4 group-hover:scale-110 transition-transform ${
                    isDarkMode ? 'text-blue-400' : 'text-blue-600'
                  }`} />
                  <Text className={`font-medium text-sm ${
                    isDarkMode ? 'text-slate-200' : 'text-slate-800'
                  }`}>{feature.title}</Text>
                </motion.div>
              ))}
            </Flex>

            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-xl p-2 shadow-lg"
            >
              <Flex className="items-center gap-1">
                <Star className="w-3 h-3 fill-white" />
                <Box>
                  <Text className="font-bold text-sm">4.9</Text>
                </Box>
              </Flex>
            </motion.div>

          </motion.div>
        </Grid>
      </Container>
    </Box>
  );
};

export default UseCasesSection;

