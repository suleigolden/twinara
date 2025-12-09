import React, { useState, useEffect } from "react";
import { FaFacebookF, FaLinkedinIn, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useTheme } from "../../contexts/ThemeContext";
import { Box, Text, Heading, Flex, Input, Button, Grid, Link, List, ListItem, FormControl } from "@chakra-ui/react";

type ToastProps = {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
  show: boolean;
}

const Toast: React.FC<ToastProps> = ({ message, type = "success", onClose, show }) => {
  const { isDarkMode } = useTheme();

  const bgColor =
    type === "success"
      ? "bg-gradient-to-r from-green-500 to-green-600"
      : "bg-gradient-to-r from-red-500 to-red-600";

  if (!show) return null;

  return (
    <Box
      className={`fixed bottom-4 right-4 ${bgColor} text-white px-6 py-4 rounded-xl shadow-2xl flex items-center justify-between space-x-4 z-50 transform transition-all duration-500 ease-out backdrop-blur-sm border border-white/10`}
    >
      <Flex className="items-center space-x-3">
        {type === "success" ? (
          <Box as="svg"
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </Box>
        ) : (
          <Box as="svg"
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </Box>
        )}
        <Text className="text-sm font-medium">{message}</Text>
      </Flex>
      <Button
        onClick={onClose}
        className="text-white/80 hover:text-white focus:outline-none transition-colors duration-200 hover:bg-white/10 rounded-full p-1"
        variant="ghost"
        size="sm"
      >
        <Box as="svg"
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </Box>
      </Button>
    </Box>
  );
};

const Footer: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success" as "success" | "error",
  });

  const footerLinks = {
    company: [
      { name: "About", href: "/about" },
      { name: "Terms of Use", href: "/terms-of-use" },
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "How it Works", href: "/how-it-works" },
      { name: "Contact Us", href: "/contact" },
      { name: "Cookies", href: "/Cookies" },
    ],
    support: [
      { name: "FAQs", href: "/faqs" },
      { name: "Policy", href: "/policy" },
      { name: "Business", href: "/business-support" },
    ],
    getHelp: [
      { name: "Support Career", href: "/support-career" },
      { name: "24h Service", href: "/#services" },
      { name: "Quick Chat", href: "/quick-chat" },
    ],
    contact: [
      { name: "WhatsApp", href: "/contact/whatsapp" },
      { name: "Support 24", href: "/contact/support-24" },
    ],
  };

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        hideToast();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      showToast("Please enter an email address", "error");
      return;
    }

    if (!emailRegex.test(email)) {
      showToast("Please enter a valid email address", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      showToast(
        "🎉 Welcome aboard! You've successfully subscribed to our newsletter."
      );
      setEmail("");
    } catch (error) {
      showToast("Oops! Something went wrong. Please try again later.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      href: "https://github.com",
      icon: <FaGithub className="w-4 h-4" />,
      hover: "hover:bg-gradient-to-r from-blue-600 to-blue-500 hover:text-white hover:scale-110",
      name: "GitHub",
    },
    {
      href: "#",
      icon: <FaFacebookF className="w-4 h-4" />,
      hover: "hover:bg-gradient-to-r from-blue-600 to-blue-500 hover:text-white hover:scale-110",
      name: "Facebook",
    },
    {
      href: "https://x.com",
      icon: <FaXTwitter className="w-4 h-4" />,
      hover: "hover:bg-gradient-to-r from-blue-600 to-blue-500 hover:text-white hover:scale-110",
      name: "Twitter",
    },
    {
      href: "https://www.linkedin.com",
      icon: <FaLinkedinIn className="w-4 h-4" />,
      hover: "hover:bg-gradient-to-r from-blue-600 to-blue-500 hover:text-white hover:scale-110",
      name: "LinkedIn",
    },
  ];

  return (
    <>
      <Box
        as="footer"
        className={`relative transition-all duration-500 border-t overflow-hidden ${
          isDarkMode
            ? "bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 border-gray-700"
            : "bg-gradient-to-b from-gray-50 via-white to-gray-100 border-gray-200"
        }`}
      >
        <Box className="absolute inset-0 opacity-5">
          <Box
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </Box>

        <Box className="relative section-container py-10 px-6 md:px-8">
          <Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
            <Box className="lg:col-span-4 md:col-span-2">
              <Flex className="flex-col h-full justify-between">
                <Box>
                  <Flex className="items-center gap-2 mb-4 group">
                    <Box className="relative">
                      <Box className="w-4 h-4 bg-gradient-to-br from-red-500 to-pink-600 rounded-full -ml-2 opacity-90 group-hover:opacity-100 transition-all duration-300 shadow-lg transform group-hover:scale-110 group-hover:-rotate-180"></Box>
                      <Box className="w-4 h-4 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full opacity-90 group-hover:opacity-100 transition-all duration-300 shadow-lg transform group-hover:scale-110 group-hover:rotate-180"></Box>
                    </Box>
                    <Text
                      className={`text-xl font-bold ml-2 tracking-wide bg-gradient-to-r bg-clip-text text-transparent ${
                        isDarkMode
                          ? "from-white to-gray-300"
                          : "from-gray-900 to-gray-700"
                      }`}
                    >
                      Twinara
                    </Text>
                  </Flex>

                  <Text
                    className={`mb-6 text-sm leading-relaxed ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Effortless task management, beautiful UI, 
                    and seamless team collaboration — for businesses, 
                    freelancers, and students.
                  </Text>
                </Box>

                <Box>
                  <Heading
                    as="h4"
                    className={`text-xs font-semibold mb-3 uppercase tracking-wider ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Follow Us
                  </Heading>
                  <Flex className="gap-2">
                    {socialLinks.map((social, i) => (
                      <Link
                        key={i}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={social.name}
                        className={`w-9 h-9 rounded-lg flex items-center justify-center shadow-md transition-all duration-300 transform focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                          isDarkMode
                            ? `bg-gray-800 text-gray-400 border border-gray-700 ${social.hover}`
                            : `bg-white text-gray-600 border border-gray-200 ${social.hover}`
                        }`}
                      >
                        {social.icon}
                      </Link>
                    ))}
                  </Flex>
                </Box>
              </Flex>
            </Box>

            <Box className="lg:col-span-5 md:col-span-1">
              <Grid className="grid-cols-2 sm:grid-cols-4 gap-6 h-full">
                {Object.entries(footerLinks).map(([category, links]) => (
                  <Box key={category} className="space-y-3">
                    <Heading
                      as="h3"
                      className={`text-sm font-bold capitalize relative pb-1 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {category.replace(/([A-Z])/g, " $1").trim()}
                      <Box className="absolute bottom-0 left-0 w-6 h-0.5 bg-gradient-to-r from-blue-600 to-transparent rounded-full"></Box>
                    </Heading>
                    <List className="space-y-2">
                      {links.map((link) => (
                        <ListItem key={`${category}-${link.name}`}>
                          <Link
                            href={link.href}
                            className={`text-xs transition-all duration-200 relative inline-block group ${
                              isDarkMode
                                ? "text-gray-400 hover:text-white"
                                : "text-gray-600 hover:text-gray-900"
                            }`}
                          >
                            {link.name}
                            <Text as="span" className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 group-hover:w-full rounded-full"></Text>
                          </Link>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                ))}
              </Grid>
            </Box>

            <Box className="lg:col-span-3 md:col-span-1">
              <Box
                className={`p-4 rounded-xl border backdrop-blur-sm ${
                  isDarkMode
                    ? "bg-gray-800/50 border-gray-700"
                    : "bg-white/80 border-gray-200 shadow-lg"
                }`}
              >
                <Heading
                  as="h3"
                  className={`text-lg font-bold mb-2 ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  Stay Updated
                </Heading>
                <Text
                  className={`text-xs mb-4 ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Get the latest updates, tips, and exclusive content delivered
                  to your inbox.
                </Text>

                <Box as="form" onSubmit={handleSubmit} className="space-y-3">
                  <FormControl>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className={`w-full px-3 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                        isDarkMode
                          ? "bg-gray-700 text-white placeholder-gray-400 border border-gray-600"
                          : "bg-gray-50 text-gray-900 placeholder-gray-500 border border-gray-200"
                      }`}
                      required
                      disabled={isSubmitting}
                    />
                  </FormControl>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2 rounded-lg text-sm font-semibold transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed text-gray-600"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg cursor-pointer"
                    }`}
                  >
                    {isSubmitting ? (
                      <Flex className="items-center justify-center">
                        <Box as="svg"
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </Box>
                        <Text>Subscribing...</Text>
                      </Flex>
                    ) : (
                      "Subscribe Now"
                    )}
                  </Button>
                </Box>

                <Text
                  className={`text-xs mt-3 text-center ${
                    isDarkMode ? "text-gray-500" : "text-gray-600"
                  }`}
                >
                  🔒 We respect your privacy. Unsubscribe at any time.
                </Text>
              </Box>
            </Box>
          </Grid>

          <Box
            className={`mt-10 pt-6 border-t text-center ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <Flex className="flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
              <Text
                className={`text-xs ${
                  isDarkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                © {new Date().getFullYear()} Twinara. All rights
                reserved.
              </Text>
              <Flex className="items-center space-x-4 text-xs">
                <Link
                  href="/terms-of-use"
                  className={`hover:underline transition-colors duration-200 ${
                    isDarkMode
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Terms
                </Link>
                <Link
                  href="/privacy-policy"
                  className={`hover:underline transition-colors duration-200 ${
                    isDarkMode
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Privacy
                </Link>
                <Link
                  href="/Cookies"
                  className={`hover:underline transition-colors duration-200 ${
                    isDarkMode
                      ? "text-gray-400 hover:text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Cookies
                </Link>
              </Flex>
            </Flex>
          </Box>
        </Box>
      </Box>

      <Toast
        message={toast.message}
        type={toast.type}
        show={toast.show}
        onClose={hideToast}
      />
    </>
  );
};

export default Footer;

