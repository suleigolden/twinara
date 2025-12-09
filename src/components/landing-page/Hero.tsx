import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import heroImage from "../../assets/landing-page/hero-image.png";
import { useTheme } from "../../contexts/ThemeContext";
import { 
  Box, 
  Heading, 
  Text, 
  Image
} from "@chakra-ui/react";

type TypingAnimationProps = {
  phrases: string[];
  className: string;
};

const TypingAnimation = ({ phrases, className }: TypingAnimationProps) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");

  const TYPING_SPEED = 50;
  const DELETING_SPEED = 30;
  const DELAY_AFTER_TYPING = 1000;

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = phrases[phraseIndex];
      const updatedText = isDeleting
        ? currentPhrase.substring(0, text.length - 1)
        : currentPhrase.substring(0, text.length + 1);

      setText(updatedText);

      if (!isDeleting && updatedText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), DELAY_AFTER_TYPING);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
      }
    };

    const timeout = setTimeout(
      handleTyping,
      isDeleting ? DELETING_SPEED : TYPING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex, phrases]);

  return (
    <Text as="span" className={className}>
      {text}
      <Text as="span" className="typing-cursor"></Text>
    </Text>
  );
};

const Hero: React.FC = () => {
  const [email, setEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { isDarkMode } = useTheme();
  const emailSectionRef = useRef<HTMLDivElement>(null);

  const handleJumpClick = () => {
    if (emailSectionRef.current) {
      emailSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      emailSectionRef.current.classList.add(
        "ring-2",
        "ring-purple-500",
        "ring-offset-2",
        "rounded-2xl"
      );
      emailSectionRef.current.classList.add("highlight");
      setTimeout(() => {
        emailSectionRef.current?.classList.remove(
          "ring-2",
          "ring-purple-500",
          "ring-offset-2",
          "highlight",
          "rounded-2xl"
        );
      }, 1500);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const phrasesForTyping = useMemo(
    () => [
      "Startups 🚀",
      "Agencies 💼",
      "Creators 🎨",
      "Enterprises 🏢",
      "Freelancers 🌍",
      "Innovators 💡",
    ],
    []
  );

  return (
    <>
      <style>{`
        .typing-cursor {
          display: inline-block;
          width: 3px;
          height: 1em;
          background-color: ${isDarkMode ? "#a78bfa" : "#8b5cf6"};
          animation: blink 1s infinite;
          margin-left: 8px;
          vertical-align: middle;
          border-radius: 2px;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .typing-animation {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        }
      `}</style>
      <Box
        as="section"
        id="home"
        className="relative flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-44 pb-16 container mx-auto overflow-hidden bg-transparent"
      >
        <Box
          as={motion.div}
          initial="hidden"
          animate="visible"
          className="w-full md:w-1/2 space-y-6 sm:space-y-8 md:space-y-12 relative z-10"
        >
          <Box
            as={motion.div}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Box
              className={`flex items-center gap-3 w-fit px-6 py-3 rounded-full backdrop-blur-sm border transition-all cursor-pointer group relative overflow-hidden ${
                isDarkMode
                  ? "hover:bg-gray-700/20 border-gray-700/30 hover:border-gray-600/40"
                  : "hover:bg-gray-100/30 border-gray-200/30 hover:border-gray-300/40 shadow-sm hover:shadow-md"
              }`}
            >
              <Box className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/5 to-purple-500/0 opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
              <motion.span
                className="text-blue-600 text-lg relative z-10"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ⭐
              </motion.span>
              <Text
                as="span"
                onClick={handleJumpClick}
                className={`cursor-pointer text-xs font-semibold relative z-10 ${
                  isDarkMode ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Jump start your growth
              </Text>
            </Box>
          </Box>

          <Box as={motion.div} variants={itemVariants}>
            <Heading
              as="h1"
              className={`text-4xl lg:text-5xl font-black leading-tight ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              We boost the{" "}
              <motion.span className="inline-block bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
                growth
              </motion.span>{" "}
              for <br />
              <TypingAnimation
                phrases={phrasesForTyping}
                className={`font-bold typing-animation ${
                  isDarkMode ? "text-purple-400" : "text-purple-600"
                }`}
              />
            </Heading>
          </Box>

          <Box as={motion.div} variants={itemVariants}>
            <Text
              className={`text-base max-w-xl ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Get the most accurate leads,{" "}
              <Text as="span" className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                sales training
              </Text>{" "}
              and conversions, tools and more — all within the same billing.
            </Text>
          </Box>

        </Box>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            type: "spring",
            damping: 20,
          }}
          className="w-full md:w-1/2 mt-8 md:mt-0 pl-0 md:pl-12 relative"
          style={{
            transform: `translate(${-mousePosition.x * 0.5}px, ${
              -mousePosition.y * 0.5
            }px)`,
          }}
        >
          <Box className="relative">
            <motion.div
              className={`absolute top-4 right-5/12 w-20 h-20 rounded-2xl backdrop-blur-sm border ${
                isDarkMode
                  ? "bg-gradient-to-br from-blue-500 to-cyan-400 border-blue-300/30"
                  : "bg-gradient-to-br from-blue-400 to-cyan-300 border-blue-200/50"
              }`}
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.6, duration: 0.6, type: "spring" }}
              whileHover={{ scale: 1.05, rotate: 5 }}
              style={{
                transform: `translate(${mousePosition.x * 0.3}px, ${
                  mousePosition.y * 0.3
                }px)`,
              }}
            />

            <motion.div
              className={`absolute -bottom-3 -left-3 w-20 h-20 rounded-2xl backdrop-blur-sm border ${
                isDarkMode
                  ? "bg-gradient-to-tr from-green-500 to-emerald-400 border-green-300/30"
                  : "bg-gradient-to-tr from-green-400 to-emerald-300 border-green-200/50"
              }`}
              initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
              whileHover={{ scale: 1.05, rotate: -5 }}
              style={{
                transform: `translate(${-mousePosition.x * 0.2}px, ${
                  -mousePosition.y * 0.2
                }px)`,
              }}
            />

            <Box
              as={motion.div}
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={heroImage}
                alt="Team meeting"
                className="rounded-2xl shadow-2xl border border-white/20 relative z-10 backdrop-blur-3xl"
              />
            </Box>
          </Box>
        </motion.div>
      </Box>
    </>
  );
};

export default Hero;

