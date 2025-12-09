import { Link } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { motion } from "framer-motion";
import { Box, Heading, Text, Flex, Grid } from "@chakra-ui/react";
import { Rocket, Settings, Search } from "lucide-react";
import {
  ShieldCheck,
  Users,
  TrendingUp,
  Globe2,
  Zap,
  HeartHandshake,
} from "lucide-react";

const FeaturesSection: React.FC = () => {
  const { isDarkMode } = useTheme();

  const features = [
    {
      icon: <Search size={32} />,
      title: "Find out what you need",
      description:
        "We analyze your needs and present tailored solutions to help you move faster.",
      bg: "from-indigo-500 to-purple-500",
    },
    {
      icon: <Settings size={32} />,
      title: "Work out the details",
      description:
        "Seamless collaboration with transparent processes and flexible engagement models.",
      bg: "from-pink-500 to-rose-500",
    },
    {
      icon: <Rocket size={32} />,
      title: "We get to work fast",
      description:
        "Launch projects quickly with efficient workflows, pricing clarity, and timely delivery.",
      bg: "from-orange-500 to-amber-500",
    },
    {
      icon: <ShieldCheck size={32} />,
      title: "Secure & Reliable",
      description:
        "Enterprise-grade security with compliance and built-in data protection at every step.",
      bg: "from-emerald-500 to-teal-500",
    },
    {
      icon: <Users size={32} />,
      title: "Collaborative Approach",
      description:
        "We work alongside your team to ensure clarity, trust, and stronger partnerships.",
      bg: "from-fuchsia-500 to-purple-600",
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Drive Growth",
      description:
        "Unlock new opportunities with strategies designed for scalability and impact.",
      bg: "from-sky-500 to-cyan-500",
    },
    {
      icon: <Globe2 size={32} />,
      title: "Global Reach",
      description:
        "Expand your business beyond borders with solutions tailored for international markets.",
      bg: "from-violet-500 to-indigo-500",
    },
    {
      icon: <Zap size={32} />,
      title: "Lightning Fast",
      description:
        "Optimized workflows and technology that ensure speed without compromising quality.",
      bg: "from-yellow-500 to-orange-500",
    },
    {
      icon: <HeartHandshake size={32} />,
      title: "Customer First",
      description:
        "Dedicated to delivering value with transparency, empathy, and long-term commitment.",
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
          How can we help your business?
        </Heading>

        <Text
          className={`mt-8 text-lg ${
            isDarkMode ? "text-gray-300/80" : "text-gray-600"
          }`}
        >
          "Empowering your growth with innovation, speed, and reliability."
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
            <Heading as="h3" className="text-2xl font-semibold mb-3">{feature.title}</Heading>

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
          to="/partner"
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
            Become a Partner
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

