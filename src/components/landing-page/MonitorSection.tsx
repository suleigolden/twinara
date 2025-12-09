import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { Box, Heading, Text, Button, Flex } from "@chakra-ui/react";

const MonitorSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0, 1, 1, 0]);
  const { isDarkMode } = useTheme();

  const handleUpcomingFeature = () => {
    console.log("🛠️ Our team is working on this amazing feature! Stay tuned.");
  };

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
            className="text-emerald-500 font-bold text-sm tracking-wider uppercase relative"
          >
            MONITOR
          </motion.span>

          <Heading
            as={motion.h2}
            className={`text-4xl md:text-5xl lg:text-6xl font-black leading-tight ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Introducing{" "}
            <Text as={motion.span}
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "100% 50%" }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-[length:200%_200%]"
            >
              best mobile
            </Text>{" "}
            carousels
          </Heading>

          <Text
            as={motion.p}
            className={`text-lg leading-relaxed max-w-md ${
              isDarkMode ? "text-gray-300" : "text-gray-500"
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Experience seamless navigation with our cutting-edge mobile carousel system. 
            Designed for performance, built for the future.
          </Text>

          <Button
            as={motion.button}
            onClick={handleUpcomingFeature}
            className={`group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-semibold rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${
              isDarkMode ? "hover:shadow-blue-900/50" : "hover:shadow-blue-300/50"
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Box
              as={motion.div}
              className="absolute inset-0 bg-gradient-to-r from-blue-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <Flex className="relative items-center gap-3">
              <Text>Learn more about monitoring</Text>
              <Box as={motion.svg}
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                whileHover={{ x: 8 }}
                transition={{ duration: 0.2 }}
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" 
                />
              </Box>
            </Flex>
          </Button>
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
            className={`relative mx-auto max-w-sm rounded-3xl p-2 shadow-2xl border ${
              isDarkMode ? "bg-gray-900 border-gray-800" : "bg-gray-100 border-gray-200"
            }`}
          >
            <Box className={`rounded-2xl overflow-hidden h-96 relative ${
              isDarkMode ? "bg-gray-800" : "bg-white"
            }`}>
              <Flex className={`justify-between items-center px-6 py-2 text-xs ${
                isDarkMode ? "bg-gray-700 text-gray-300" : "bg-gray-50 text-gray-600"
              }`}>
                <Text>9:41</Text>
                <Flex className="gap-1">
                  <Box className="w-4 h-2 bg-green-500 rounded-sm"></Box>
                  <Box className="w-4 h-2 bg-green-500 rounded-sm"></Box>
                  <Box className="w-4 h-2 bg-green-500 rounded-sm"></Box>
                </Flex>
              </Flex>
              <Flex className={`h-full items-center justify-center ${
                isDarkMode ? "bg-gray-800" : "bg-white"
              }`}>
                <Box className="text-center">
                  <Text className={`text-4xl mb-4 ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    📱
                  </Text>
                  <Text className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                    Mobile Carousel Demo
                  </Text>
                </Box>
              </Flex>
            </Box>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default MonitorSection;

