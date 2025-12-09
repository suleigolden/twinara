import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { Box, Text, Flex } from "@chakra-ui/react";
import smileLadyImage from "../../assets/landing-page/smile-lady.png";
import { Brain } from "lucide-react";

const MonitorSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);
  const { isDarkMode } = useTheme();


  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative max-w-7xl mx-auto px-4 py-20 md:py-32 overflow-hidden"
    >
      <motion.div
        style={{ y, opacity }}
        className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20"
      >
        <motion.div
          className="w-full lg:w-1/2 space-y-8"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            className="text-blue-500 font-bold text-sm tracking-wider uppercase relative"
          >
            YOUR COMPANION
          </motion.span>

          <motion.h2
            className={`text-4xl md:text-5xl lg:text-6xl font-black leading-tight ${isDarkMode ? "text-white" : "text-gray-900"
              }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            A{" "}
            <motion.span
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "100% 50%" }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-[length:200%_200%]"
            >
              gentle companion
            </motion.span>{" "}
            that knows you
          </motion.h2>

          <motion.p
            className={`text-lg leading-relaxed max-w-md ${isDarkMode ? "text-gray-300" : "text-gray-500"
              }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Twinara creates personalized cognitive tasks from your own life stories, adapting to your comfort level while always supporting you with dignity and respect.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >

          </motion.div>
        </motion.div>

        <motion.div
          className="w-full lg:w-1/2 relative"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className={`absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-2xl opacity-20 blur-sm`}
          />
          <motion.div
            animate={{
              y: [0, 15, 0],
              rotate: [0, -3, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl opacity-25 blur-sm"
          />

          <motion.div
            whileHover={{
              scale: 1.02,
              transition: { duration: 0.3 }
            }}
            className={`relative mx-auto max-w-sm rounded-3xl p-2 shadow-2xl border ${isDarkMode ? "bg-gray-900 border-gray-800" : "bg-gray-100 border-gray-200"
              }`}
          >
            <Box className={`rounded-2xl overflow-hidden h-96 relative ${isDarkMode ? "bg-gray-800" : "bg-white"
              }`}>
              <Flex className={`justify-between items-center px-6 py-2 text-xs ${isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-50 text-gray-600"
                }`}>
                <Text>9:41</Text>
                <Flex className="gap-1">
                  <Box className="w-4 h-2 bg-green-500 rounded-sm"></Box>
                  <Box className="w-4 h-2 bg-green-500 rounded-sm"></Box>
                  <Box className="w-4 h-2 bg-green-500 rounded-sm"></Box>
                </Flex>
              </Flex>
              <Flex className={`h-full flex-col items-center justify-center p-6 space-y-4 ${isDarkMode ? "bg-gray-800" : "bg-white"
                }`}>
                <Flex className={`w-24 h-24 rounded-full items-center justify-center mb-2 ${isDarkMode ? "bg-blue-600/30" : "bg-blue-100"
                  }`}
                  mb={10}>
                  <motion.img
                    src={smileLadyImage}
                    alt="Smile lady"
                    className="rounded-2xl shadow-2xl border border-white/20 relative z-10 backdrop-blur-3xl"
                    whileHover={{ scale: 1.02 }}
                  />
                </Flex>
                <Flex className={`w-16 h-16 rounded-full items-center justify-center mb-2 ${isDarkMode ? "bg-blue-600/30" : "bg-blue-100"
                  }`}>
                  
                  <Brain className={`w-8 h-8 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
                </Flex>
                
                <Text className={`text-lg font-semibold text-center ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  Twinara
                </Text>
                <Text className={`text-sm text-center max-w-xs ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  "What is your name?"
                </Text>


                <Flex className="gap-2 mt-4">
                  <Box className={`w-2 h-2 rounded-full ${isDarkMode ? "bg-blue-400" : "bg-blue-600"}`} />
                  <Box className={`w-2 h-2 rounded-full ${isDarkMode ? "bg-purple-400" : "bg-purple-600"}`} />
                  <Box className={`w-2 h-2 rounded-full ${isDarkMode ? "bg-pink-400" : "bg-pink-600"}`} />
                </Flex>
              </Flex>
            </Box>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default MonitorSection;

