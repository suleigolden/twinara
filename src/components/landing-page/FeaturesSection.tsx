import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { motion } from "framer-motion";
import { Box, Heading, Text, Flex, Grid } from "@chakra-ui/react";
import {
  Brain,
  Heart,
  ShieldCheck,
  Users,
  Clock,
  CheckCircle,
  BookOpen,
  MessageCircle,
  Cpu,
} from "lucide-react";

const FeaturesSection: React.FC = () => {
  const { isDarkMode } = useTheme();

  const features = [
    {
      icon: <Brain size={32} />,
      title: "Personalized Memory Tasks",
      description:
        "Cognitive exercises generated from your own life stories, family relationships, and personal history—not generic puzzles.",
      bg: "from-indigo-500 to-purple-500",
    },
    {
      icon: <Heart size={32} />,
      title: "Person-Centered Approach",
      description:
        "Reinforces memory using real-life context. Remembering your daughter's name matters more than random numbers.",
      bg: "from-pink-500 to-rose-500",
    },
    {
      icon: <Cpu size={32} />,
      title: "Adaptive Difficulty",
      description:
        "Automatically adjusts question type, difficulty level, and language simplicity based on your responses over time.",
      bg: "from-orange-500 to-amber-500",
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Dignity & Emotional Safety",
      description:
        "Never says 'wrong', never highlights failure. Always reassures and supports with gentle, encouraging interactions.",
      bg: "from-emerald-500 to-teal-500",
    },
    {
      icon: <Users size={32} />,
      title: "Family & Relationships",
      description:
        "Reinforces bonds with loved ones through personalized questions about family members and social connections.",
      bg: "from-fuchsia-500 to-purple-600",
    },
    {
      icon: <Clock size={32} />,
      title: "Routine Awareness",
      description:
        "Helps maintain awareness of daily activities and time, reducing confusion about schedules and plans.",
      bg: "from-sky-500 to-cyan-500",
    },
    {
      icon: <CheckCircle size={32} />,
      title: "Recognition-Based Tasks",
      description:
        "Low-stress interactions with multiple choice questions and yes/no confirmations to increase success rates.",
      bg: "from-violet-500 to-indigo-500",
    },
    {
      icon: <BookOpen size={32} />,
      title: "Story Reinforcement",
      description:
        "Strengthens narrative memory by engaging with personal stories, hobbies, and meaningful life experiences.",
      bg: "from-yellow-500 to-orange-500",
    },
    {
      icon: <MessageCircle size={32} />,
      title: "Gentle Behavioral Prompts",
      description:
        "Encourages healthy habits with supportive reminders for walks, hydration, and other wellness activities.",
      bg: "from-red-500 to-rose-500",
    },
  ];

  return (
    <Box
      as="section"
      className={`relative w-full px-6 py-20 overflow-hidden transition-colors duration-500 ${
        isDarkMode ? "text-gray-100" : "text-gray-900"
      }`}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-16 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <Heading as="h2" className="text-4xl md:text-5xl font-extrabold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-blue-400 to-indigo-600">
          How Twinara Supports You
        </Heading>

        <Text
          className={`mt-8 text-lg ${
            isDarkMode ? "text-gray-300/80" : "text-gray-600"
          }`}
        >
          "Supporting individuals with dementia through personalized cognitive care, dignity, and compassion."
        </Text>
      </motion.div>

      {/* Features */}
      <Grid className="grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className={`relative group flex flex-col items-center text-center p-8 rounded-2xl shadow-lg border overflow-hidden backdrop-blur-xl transition-all duration-300 ${
              isDarkMode
                ? "bg-slate-900/60 border-slate-700 hover:shadow-purple-500/30"
                : "bg-white/70 border-gray-200 hover:shadow-purple-300"
            }`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Icon Circle */}
            <Flex
              className={`mb-6 w-20 h-20 items-center justify-center rounded-2xl bg-gradient-to-r ${feature.bg} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}
            >
              {feature.icon}
            </Flex>

            {/* Title */}
            <Heading as="h3" size="md" className="text-2xl font-semibold mb-3">{feature.title}</Heading>

            {/* Description */}
            <Text
              className={`leading-relaxed ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {feature.description}
            </Text>
          </motion.div>
        ))}
      </Grid>

      {/* Call to Action */}
      <motion.div
        className="text-center mt-16 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Link
          to="/"
          className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-full font-semibold text-white 
             bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 
             shadow-lg hover:shadow-2xl hover:scale-105 
             transition-all duration-300 ease-out overflow-hidden"
        >
          {/* Glow background on hover */}
          <Text as="span" className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 opacity-0 group-hover:opacity-100 blur-lg transition-opacity duration-500" />

          {/* Icon */}
          <Box as="svg"
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 relative z-10 group-hover:rotate-6 group-hover:scale-110 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v18m9-9H3"
            />
          </Box>

          {/* Text */}
          <Text as="span" className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
            Get Started with Twinara
          </Text>

          {/* Shiny reflection */}
          <Text as="span"
            className="absolute top-0 left-[-50%] w-[200%] h-full 
                   bg-gradient-to-r from-transparent via-white/20 to-transparent 
                   transform -skew-x-12 group-hover:animate-[shine_1.2s_ease-in-out]"
          />
        </Link>
      </motion.div>
    </Box>
  );
};

export default FeaturesSection;

