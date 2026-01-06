import { useState, useEffect } from 'react';
import { ArrowRight, Mail, CheckCircle, AlertCircle, Sparkles, Zap } from 'lucide-react';
import { useTheme } from "../../contexts/ThemeContext";
import { Box, Heading, Text, Input, Button, Flex } from "@chakra-ui/react";

type Particle = {
  id: number;
  x: number;
  y: number;
  delay: number;
  duration: number;
  size: number;
}

const NewsletterSection: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [email, setEmail] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState('');
  const [registeredEmails, setRegisteredEmails] = useState<string[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 4,
        duration: 3 + Math.random() * 2,
        size: 2 + Math.random() * 4
      }));
      setParticles(newParticles);
    };
    generateParticles();
  }, []);

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = () => {
    if (!email.trim()) {
      setError('Please enter your email address.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address (e.g. user@gmail.com).');
      return;
    }

    if (registeredEmails.includes(email.toLowerCase())) {
      setError('⚠ This email is already registered.');
      return;
    }

    setRegisteredEmails([...registeredEmails, email.toLowerCase()]);
    setError('');
    console.log('Email submitted:', email);

    setShowPopup(true);
    setEmail('');

    setTimeout(() => setShowPopup(false), 4000);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <Box as="section" id="newsletter" className={`relative py-20 px-4 md:px-8 overflow-hidden bg-transparent`}>
      <Box className="absolute inset-0">
        {particles.map((particle) => (
          <Box
            key={particle.id}
            className={`absolute w-1 h-1 ${isDarkMode ? 'bg-white/30' : 'bg-gray-400/30'} rounded-full animate-pulse`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
          />
        ))}
        
        <Box className="absolute inset-0 opacity-10">
          <Box className={`absolute top-20 right-20 w-32 h-32 border ${isDarkMode ? 'border-white/20' : 'border-gray-400/20'} rotate-45 rounded-lg`}></Box>
          <Box className={`absolute bottom-32 left-16 w-24 h-24 border ${isDarkMode ? 'border-white/20' : 'border-gray-400/20'} rotate-12 rounded-full`}></Box>
          <Box className={`absolute top-1/2 right-32 w-16 h-16 border-2 ${isDarkMode ? 'border-white/20' : 'border-gray-400/20'} rotate-45`}></Box>
        </Box>
      </Box>

      <Box className="relative max-w-6xl mx-auto">
        <Box className="text-center mb-16">
          <Flex className="items-center justify-center flex-col gap-6 mb-8">
            <Box className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-lg">
              <Mail className="w-8 h-8 text-white" />
            </Box>
            <Box className="px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full backdrop-blur-sm">
              <Flex className="items-center gap-2">
                <Sparkles className={`w-5 h-5 ${isDarkMode ? 'text-blue-300' : 'text-blue-400'}`} />
                <Text className={`text-lg font-medium ${isDarkMode ? 'text-blue-200' : 'text-blue-600'}`}>Newsletter</Text>
              </Flex>
            </Box>
          </Flex>

          <Heading as="h2" className={`text-4xl lg:text-6xl font-bold mb-8 bg-gradient-to-r ${isDarkMode ? 'from-white via-blue-200 to-purple-200' : 'from-gray-900 via-blue-600 to-purple-600'} bg-clip-text text-transparent leading-tight`}>
            Stay Connected
          </Heading>
          
          <Text className={`text-lg md:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-10 leading-relaxed  mx-auto`}>
            Get cognitive support tips, research updates, and be the first to know about new 
            <Text as="span" className={`text-transparent bg-gradient-to-r ${isDarkMode ? 'from-blue-400 to-purple-400' : 'from-blue-600 to-purple-600'} bg-clip-text font-semibold`}> features and resources</Text>
          </Text>

          <Flex className="flex-wrap gap-4 justify-center mb-12">
            {['🧠 Cognitive tips', '💙 Caregiver resources', '📚 Research updates'].map((feature, index) => (
              <Box key={index} className={`flex items-center gap-2 px-6 py-3 ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-gray-100/80 border-gray-200/50'} backdrop-blur-sm border rounded-full`}>
                <Text className={`text-base ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} font-medium`}>{feature}</Text>
              </Box>
            ))}
          </Flex>
        </Box>

        <Flex className="justify-center">
          <Box className="w-full max-w-2xl">
            <Box className="relative">
              <Box className="relative group">
                <Box className="absolute -inset-1 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></Box>
                
                <Box className={`relative ${isDarkMode ? 'bg-white/10 border-white/20' : 'bg-white/90 border-gray-200/50'} backdrop-blur-xl border rounded-2xl p-3 shadow-2xl`}>
                  <Flex className="flex-col sm:items-center sm:flex-row gap-3">
                    <Box className="relative flex-1">
                      <Input
                        type="email"
                        aria-label="Email address"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className={`w-full pl-14 pr-6 py-5 bg-transparent 
                          ${isDarkMode 
                            ? 'text-white placeholder:text-white/60' 
                            : 'text-gray-900 placeholder:text-gray-500'
                          } 
                          focus:outline-none 
                          text-lg
                          font-medium 
                          rounded-xl`}
                      />
                    </Box>

                    <Button
                      type="button"
                      onClick={handleSubmit}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      className={`h-[60px] px-8 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600
                        rounded-xl text-white text-lg font-semibold
                        flex items-center justify-center gap-3 whitespace-nowrap
                        transform transition-all duration-200 cursor-pointer 
                        ${isHovered ? 'scale-105 shadow-lg' : 'shadow-md'}
                        hover:shadow-blue-500/25`}
                    >
                      <Zap className="w-5 h-5" />
                      Subscribe Now
                      <ArrowRight className={`w-5 h-5 transition-transform duration-200 ${isHovered ? 'translate-x-1' : ''}`} />
                    </Button>
                  </Flex>
                </Box>
              </Box>

              <Box className="relative mt-6 min-h-[3rem]">
                {error && (
                  <Flex className="absolute inset-x-0 items-center justify-center gap-3 bg-red-500/90 backdrop-blur-sm text-white px-6 py-4 rounded-xl shadow-lg border border-red-400/50">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <Text className="font-medium text-base">{error}</Text>
                  </Flex>
                )}

                {showPopup && !error && (
                  <Flex className="absolute inset-x-0 items-center justify-center gap-3 bg-emerald-500/90 backdrop-blur-sm text-white px-6 py-4 rounded-xl shadow-lg border border-emerald-400/50">
                    <CheckCircle className="w-5 h-5 flex-shrink-0" />
                    <Text className="font-medium text-base">💙 Thank you for joining our community!</Text>
                  </Flex>
                )}
              </Box>

              <Flex className={`mt-8 items-center justify-center gap-8 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                <Flex className="items-center gap-2">
                  <Box className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></Box>
                  <Text className="font-medium">No spam, ever</Text>
                </Flex>
                <Box className={`w-px h-5 ${isDarkMode ? 'bg-gray-600' : 'bg-gray-400'}`}></Box>
                <Flex className="items-center gap-2">
                  <Box className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></Box>
                  <Text className="font-medium">Unsubscribe anytime</Text>
                </Flex>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default NewsletterSection;

