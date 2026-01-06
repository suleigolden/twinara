import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext";
import { 
  Box, 
  Heading, 
  Text
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
      "Memory Support 🧠",
      "Identity Recall 💭",
      "Daily Routines 📅",
      "Family Bonds 👨‍👩‍👧‍👦",
      "Personal Stories 📖",
      "Cognitive Care ❤️",
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
        className="relative flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 md:pt-44 pb-16  mx-auto overflow-hidden"
        position="relative"
        w="100%"
        h="100vh"
      >
        {/* Video Background */}
        <Box
          as="video"
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          zIndex={0}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
            pointerEvents: "none",
          }}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore - video attributes need to be passed as props
          {...{
            autoPlay: true,
            loop: true,
            muted: true,
            playsInline: true,
          }}
        >
          <source
            src="https://firebasestorage.googleapis.com/v0/b/imageuploads-33589.appspot.com/o/twinara%2FPink%20Bold%20Modern%20Creative%20Portfolio%20Presentation.mp4?alt=media&token=3d48c55e-5258-479a-a313-f5ae8cbba740"
            type="video/mp4"
          />
        </Box>

        {/* Overlay for better text readability */}
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          // bgGradient={
          //   isDarkMode
          //     ? "linear(to-r, rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.7))"
          //     : "linear(to-r, rgba(255,255,255,0.85), rgba(255,255,255,0.7), rgba(255,255,255,0.85))"
          // }
          zIndex={1}
        />

        {/* Content */}
        <Box
          as={motion.div}
          initial="hidden"
          animate="visible"
          className="w-full md:w-1/2 space-y-6 sm:space-y-8 md:space-y-12 relative"
          zIndex={2}
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
                color={"white"}
              >
                Personalized Cognitive Companion
              </Text>
            </Box>
          </Box>

          <Box as={motion.div} variants={itemVariants}>
            <Heading
              as="h1"
              color={"white"}
            >
              A Personalized{" "}
              <motion.span color={"white"}>
                Cognitive Companion
              </motion.span>{" "}
              for <br />
              <TypingAnimation
                phrases={phrasesForTyping}
                className="text-white"
              />
            </Heading>
          </Box>

          <Box as={motion.div} variants={itemVariants}>
            <Text
              color={"white"}
            >
              Twinara gently supports individuals living with dementia through{" "}
              <Text as="span" color={"white"}>
                personalized memory exercises
              </Text>{" "}
              and cognitive tasks based on their own life stories, family, and daily routines.
            </Text>
          </Box>

        </Box>
      </Box>
    </>
  );
};

export default Hero;

