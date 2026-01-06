import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { Box, Heading, Text, Grid, Flex } from "@chakra-ui/react";

const PurposeSection: React.FC = () => {
  const { isDarkMode } = useTheme();

  const features = [
    {
      icon: "🧠",
      title: "Person-Centered Memory",
      description:
        "Reinforces memory using real-life context from your personal history, family, and daily routines—not abstract puzzles.",
    },
    {
      icon: "💙",
      title: "Dignity & Emotional Safety",
      description:
        "Never says 'wrong', never highlights failure. Always provides gentle, encouraging support that respects your dignity.",
    },
    {
      icon: "⚙️",
      title: "Adaptive Cognition",
      description:
        "Automatically adjusts question difficulty, language simplicity, and hint frequency based on your responses over time.",
    },
    {
      icon: "🔍",
      title: "Transparency & Trust",
      description:
        "Always clearly identified as an AI assistant. Honest, transparent communication that never pretends to be human.",
    },
  ];

  return (
    <Box
      as="section"
      id="about"
      className={`relative w-full py-16 px-4 md:px-8 transition-colors duration-500 bg-transparent`}
    >
      {!isDarkMode && (
        <Box
          aria-hidden="true"
          className="pointer-events-none absolute -top-12 -right-12 h-64 w-64 rounded-full blur-3xl opacity-40"
          style={{
            background:
              "radial-gradient(closest-side, rgba(99, 102, 241, 0.35), rgba(99, 102, 241, 0.10), transparent 70%)",
          }}
        />
      )}

      <Box className="max-w-6xl mx-auto">
        <Grid className="md:grid-cols-3 grid-cols-1 gap-10 md:gap-8">
          {/* Left column */}
          <Box>
            <Text
              size="xl"
              className={`text-xl font-medium mb-3 tracking-wide ${isDarkMode ? "text-blue-300/90" : "text-indigo-600"
                }`}
            >
              OUR PURPOSE
            </Text>

            <Heading
              size="lg"
              className={` ${isDarkMode ? "text-gray-100" : "text-gray-900"
                } md:w-4/5`}
            >
              Supporting memory loss through personalized cognitive care
            </Heading>
          </Box>

          {/* Right column */}
          <Grid className="col-span-2 grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Flex
                key={index}
                className={`relative items-start space-x-4 p-5 rounded-xl border
                            transition-all duration-300 ease-out hover:translate-y-[-2px]
                            ${isDarkMode
                    ? "bg-slate-800/60 border-slate-700"
                    : "bg-white border-indigo-100"
                  }
                            shadow-sm hover:shadow-lg`}
              >
                {!isDarkMode && (
                  <>
                    <Box
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-xl"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(99,102,241,0.08), transparent 40%)",
                      }}
                    />
                  </>
                )}

                <Flex
                  className={`w-12 h-12 items-center justify-center rounded-lg text-xl shrink-0 z-[1] transition-transform duration-300 hover:scale-105
                              ${isDarkMode
                      ? "bg-slate-700/70 text-gray-100"
                      : "bg-indigo-50 text-indigo-600"
                    }`}
                  aria-hidden="true"
                >
                  {feature.icon}
                </Flex>

                <Box className="z-[1]">
                  <Heading
                    as="h3"
                    size="md"
                    className={`text-lg sm:text-xl font-semibold mb-1.5 ${isDarkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                  >
                    {feature.title}
                  </Heading>

                  <Text
                    className={`${isDarkMode ? "text-gray-300" : "text-gray-700"
                      }`}
                  >
                    {feature.description}
                  </Text>
                </Box>
              </Flex>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default PurposeSection;

