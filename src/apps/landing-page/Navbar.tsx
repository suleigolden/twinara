import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Menu, X, Sun, Moon, Zap, Users, BookOpen, Sparkles } from "lucide-react";
import {  useNavigate, useLocation } from "react-router-dom";
import { Logo } from "../../components/icons/Logo";
import { useTheme } from "../../contexts/ThemeContext";
import { useUser } from "../../hooks/use-user";
import { getNavItems } from "../../common/constants/nav-items";
import { homePageLink } from "../../common/utils/home-page-link";
import { AdminNavbarLinks } from "../../components/navbar/AdminNavbarLinks";
import { SignIn } from "../auth/signIn/SignIn";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  useDisclosure,
  Button,
  Box,
  Flex,
  Text,
  Container,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";

// Custom hook for smooth scrolling with intersection observer
const useSmoothScroll = () => {
  const scrollToElement = useCallback((elementId: string, offset = 80) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  return scrollToElement;
};

// Custom hook for outside click detection
const useOutsideClick = (ref: React.RefObject<HTMLElement | null>, callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref, callback]);
};

type NavLinkItem = {
  href: string;
  label: string;
  icon: React.ReactNode;
}

type DropdownItem = {
  href: string;
  label: string;
  icon: string;
  description: string;
}

type NavLinkProps = {
  link: NavLinkItem;
  isMobile?: boolean;
  activeLink: string;
  hoveredLink: string | null;
  onNavClick: (href: string) => void;
  onHover: (href: string | null) => void;
  isDarkMode: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ link, isMobile = false, activeLink, hoveredLink, onNavClick, onHover, isDarkMode }) => {
  const isActive = activeLink === link.href;
  const isHovered = hoveredLink === link.href;

  return (
    <Button
      onClick={() => onNavClick(link.href)}
      onMouseEnter={() => !isMobile && onHover(link.href)}
      onMouseLeave={() => !isMobile && onHover(null)}
      variant="ghost"
      className={`
        ${isMobile 
          ? `flex items-center gap-3 text-base font-semibold py-4 px-4 rounded-xl w-full text-left transform hover:scale-[1.02]` 
          : `flex items-center gap-2 text-sm xl:text-base font-semibold relative overflow-hidden group transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 px-3 py-2 rounded-lg`
        }
        ${isActive 
          ? isMobile
            ? isDarkMode ? "bg-blue-900/40 text-blue-400 border border-blue-700/50 shadow-lg shadow-blue-900/20" : "bg-blue-50 text-blue-600 border border-blue-200 shadow-lg shadow-blue-200/30"
            : "text-blue-600 shadow-lg shadow-blue-200/50" 
          : isDarkMode 
            ? isMobile ? "text-gray-300 hover:bg-gray-800/50 hover:text-blue-400" : "text-gray-300 hover:text-blue-400 hover:shadow-lg hover:shadow-blue-900/20"
            : isMobile ? "text-gray-700 hover:bg-gray-50 hover:text-blue-600" : "text-gray-600 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-200/30"
        }
        transition-all duration-300
      `}
    >
      {isMobile && (
        <Text as="span" className={`transition-all duration-300 ${isActive || isHovered ? "scale-110 rotate-12" : ""}`}>
          {link.icon}
        </Text>
      )}
      <Text as="span" className={`relative z-10 transition-all duration-300 ${!isMobile && "group-hover:drop-shadow-sm"}`}>
        {link.label}
      </Text>
      
      {!isMobile && (
        <>
          {/* Enhanced underline effect */}
          <Box className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-full transition-all duration-500 ease-out ${
            isActive || isHovered ? "w-full opacity-100" : "w-0 opacity-0"
          }`} />
          
          {/* Glowing background */}
          <Box className={`absolute inset-0 rounded-lg bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-all duration-500 ${
            isDarkMode ? "from-blue-500/20 via-cyan-500/20 to-purple-500/20" : "from-blue-500/10 via-cyan-500/10 to-purple-500/10"
          }`} />
          
          {/* Border glow */}
          <Box className={`absolute inset-0 rounded-lg border opacity-0 group-hover:opacity-30 transition-all duration-500 ${
            isDarkMode ? "border-blue-400/30" : "border-blue-500/20"
          }`} />
        </>
      )}
    </Button>
  );
};

export const Navbar: React.FC = () => {
  // State management
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  
  // Hooks
  const { isDarkMode, toggleTheme } = useTheme();
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const smoothScroll = useSmoothScroll();
  const {
    isOpen: isSignInOpen,
    onOpen: onSignInOpen,
    onClose: onSignInClose,
  } = useDisclosure();

  // Get navigation items from twinara's system
  const twinaraNavItems = useMemo(() => getNavItems(user), [user]);
  

  const navLinks = useMemo(() => [
    { href: "/#home", label: "Home", icon: <Sparkles className="w-4 h-4" /> },
    { href: "/about", label: "About", icon: <Users className="w-4 h-4" /> },
    { href: "/#use-cases", label: "Use Cases", icon: <Zap className="w-4 h-4" /> },
    { href: "/#testimonials", label: "Testimonials", icon: <BookOpen className="w-4 h-4" /> },
    { href: "/#faq", label: "FAQ", icon: <BookOpen className="w-4 h-4" /> },
  ], []);

  const dropdownItems = useMemo<DropdownItem[]>(() => [
    { 
      href: "/contributors", 
      label: "Contributors", 
      icon: "👥",
      description: "Meet our amazing team"
    },
    { 
      href: "/contributor-guide", 
      label: "Contributor Guide", 
      icon: "📖",
      description: "Learn how to contribute"
    },
    { 
      href: "/leaderboard", 
      label: "LeaderBoard", 
      icon: "🏆",
      description: "Check your rank"
    }
  ], []);

  // Get current active link
  const activeLink = useMemo(() => {
    const currentPath = location.pathname + location.hash;
    return currentPath === '/' ? '/#home' : currentPath;
  }, [location]);

  // Check if any Community child route is active
  const isCommunityActive = useMemo(() => {
    return dropdownItems.some(item => location.pathname.startsWith(item.href));
  }, [location, dropdownItems]);

  // Enhanced navigation handler
  const handleNavClick = useCallback((href: string) => {
    if (href.includes('#')) {
      const sectionId = href.split('#')[1];
      
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => smoothScroll(sectionId), 100);
      } else {
        smoothScroll(sectionId);
      }
    } else {
      navigate(href);
    }
    
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname, navigate, smoothScroll]);

  const handleDropdownItemClick = useCallback((href: string) => {
    navigate(href);
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  }, [navigate]);

  // Scroll detection for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Outside click for dropdown
  useOutsideClick(dropdownRef, () => setIsDropdownOpen(false));

  // Scroll lock for mobile menu
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Keyboard navigation
  const handleKeyDown = useCallback((event: React.KeyboardEvent, action: () => void) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  }, []);

  // Get Sign In button from nav items
  const signInButton = useMemo(() => {
    return twinaraNavItems.find(item => item.type === 'button' && item.label === 'Sign In');
  }, [twinaraNavItems]);

  return (
    <>
      <Box
        as="nav"
        role="navigation"
        aria-label="Main Navigation"
        className={`
          fixed top-0 inset-x-0 z-[9999] border-b backdrop-blur-xl transition-all duration-500
          ${isScrolled 
            ? isDarkMode
              ? "bg-gray-900/98 border-gray-700/60 shadow-2xl shadow-gray-900/30"
              : "bg-white/98 border-gray-100/60 shadow-xl shadow-gray-200/30"
            : isDarkMode
              ? "bg-gray-900/95 border-gray-700/50 shadow-2xl shadow-gray-900/20"
              : "bg-white/95 border-gray-100/50 shadow-xl shadow-gray-200/20"
          }
        `}
      >
        <Container maxW="7xl" className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 xl:px-12 lg:h-20">
          <Logo size={{ base: 39, lg: 32 }} />

          {/* Desktop Navigation */}
          <Flex 
            display={{ base: 'none', xl: 'flex' }}
            className="items-center gap-6 xl:gap-8 2xl:gap-10 ml-10"
          >
            {navLinks.map((link) => (
              <NavLink 
                key={link.href} 
                link={link}
                activeLink={activeLink}
                hoveredLink={hoveredLink}
                onNavClick={handleNavClick}
                onHover={setHoveredLink}
                isDarkMode={isDarkMode}
              />
            ))}

            {/* Enhanced Dropdown */}
            <Box ref={dropdownRef} className="relative">
              {/* <Button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                onKeyDown={(e) => handleKeyDown(e, () => setIsDropdownOpen(!isDropdownOpen))}
                variant="ghost"
                className={`
                  flex items-center gap-2 text-sm xl:text-base font-semibold relative overflow-hidden group 
                  transition-all duration-500 transform hover:scale-110 hover:-translate-y-1 px-3 py-2 rounded-lg
                  ${
                    isDarkMode
                      ? (isCommunityActive || isDropdownOpen
                          ? "text-blue-600"
                          : "text-gray-300 hover:text-blue-400")
                      : (isCommunityActive || isDropdownOpen
                          ? "text-blue-600"
                          : "text-gray-600 hover:text-blue-600")
                  }
                `}
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                <Text as="span" className="relative z-10 transition-all duration-300 group-hover:drop-shadow-sm">
                  Community
                </Text>

                <ChevronDown
                  className={`w-4 h-4 relative z-10 transition-all duration-500 group-hover:scale-110 ${
                    isDropdownOpen ? "rotate-180 text-blue-600" : "rotate-0"
                  }`}
                />

                <Box className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 via-cyan-500 to-purple-500 rounded-full transition-all duration-500 ease-out ${
                  (isDropdownOpen || isCommunityActive) ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                }`} />

                <Box className={`absolute inset-0 rounded-lg bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-all duration-500 ${
                  isDarkMode ? "from-blue-500/20 via-cyan-500/20 to-purple-500/20" : "from-blue-500/10 via-cyan-500/10 to-purple-500/10"
                }`} />

                <Box className={`absolute inset-0 rounded-lg border opacity-0 group-hover:opacity-30 transition-all duration-500 ${
                  isDarkMode ? "border-blue-400/30" : "border-blue-500/20"
                }`} />
              </Button> */}

              {/* Enhanced Dropdown Menu */}
              {isDropdownOpen && (
                <Box className={`
                  absolute top-full right-0 mt-3 w-64 rounded-2xl border shadow-2xl backdrop-blur-xl overflow-hidden z-[60] 
                  transition-all duration-500 transform origin-top-right opacity-100 scale-100 translate-y-0
                  ${isDarkMode
                    ? "bg-gray-800/98 border-gray-600/40 shadow-gray-900/70"
                    : "bg-white/98 border-gray-200/40 shadow-gray-300/70"
                  }
                `}>
                  <Box className="py-3">
                    {dropdownItems.map((item, index) => (
                      <Button
                        key={item.href}
                        onClick={() => handleDropdownItemClick(item.href)}
                        variant="ghost"
                        className={`
                          flex items-start gap-4 px-5 py-4 text-sm font-medium transition-all duration-400 group w-full text-left 
                          transform hover:scale-105 hover:-translate-y-0.5 relative overflow-hidden
                          ${isDarkMode
                            ? "text-gray-300 hover:bg-gray-700/60 hover:text-blue-400 hover:shadow-lg hover:shadow-blue-900/20"
                            : "text-gray-700 hover:bg-gray-50/80 hover:text-blue-600 hover:shadow-lg hover:shadow-blue-200/30"
                          }
                        `}
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <Text as="span" className="text-lg group-hover:scale-125 group-hover:rotate-12 transition-all duration-400 relative z-10 mt-0.5">
                          {item.icon}
                        </Text>
                        <Flex className="flex-col">
                          <Text as="span" className="relative z-10 group-hover:drop-shadow-sm transition-all duration-300 font-semibold">
                            {item.label}
                          </Text>
                          <Text as="span" className={`text-xs mt-1 transition-all duration-300 ${
                            isDarkMode ? "text-gray-400" : "text-gray-500"
                          }`}>
                            {item.description}
                          </Text>
                        </Flex>
                        
                        <Box className={`absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-all duration-400 ${
                          isDarkMode ? "from-blue-500/30 to-cyan-500/30" : "from-blue-500/20 to-cyan-500/20"
                        }`} />
                        <Box className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-all duration-400 transform scale-y-0 group-hover:scale-y-100" />
                      </Button>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Flex>

          {/* Desktop CTA + Theme Toggle + User Menu */}
          <Flex 
            display={{ base: 'none', xl: 'flex' }}
            className="items-center gap-3 xl:gap-4"
          >
            {user ? (
              <AdminNavbarLinks
                onOpen={() => {}}
                secondary={true}
                fixed={true}
                variant=""
              />
            ) : signInButton && (
              <Button
                  onClick={onSignInOpen}
                  bg={"brand.500"}
                  color={"white"}
                  size="lg"
                  fontWeight="bold"
                  _hover={{
                    bg: "brand.600",
                    transform: "translateY(-1px)",
                    boxShadow: "lg",
                  }}
                  transition="all 0.2s ease"
                    >
                      {signInButton.label}
              </Button>
            )}

            {/* Theme Toggle Button - Commented out */}
            {/* <Button
              onClick={toggleTheme}
              variant="ghost"
              className={`
                w-10 h-10 xl:w-11 xl:h-11 flex items-center justify-center rounded-xl transition-all duration-300 
                group transform hover:scale-110 hover:rotate-12 relative overflow-hidden
                ${isDarkMode 
                  ? "bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-yellow-400 shadow-lg shadow-gray-800/50" 
                  : "bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 text-blue-600 shadow-lg shadow-blue-200/50"
                }
              `}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              <Box className={`transition-transform duration-500 relative z-10 ${isDarkMode ? "rotate-0" : "rotate-[360deg]"}`}>
                {isDarkMode ? <Sun className="h-4 w-4 xl:h-5 xl:w-5" /> : <Moon className="h-4 w-4 xl:h-5 xl:w-5" />}
              </Box>
              <Box className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            </Button> */}
          </Flex>

          {/* Mobile Menu Button */}
          <Button
            display={{ base: 'flex', xl: 'none' }}
            className={`
              relative z-[10000] p-3 rounded-xl transition-all duration-300 hover:scale-105
              ${isDarkMode 
                ? "bg-gray-800/50 hover:bg-gray-700/50 text-white border border-gray-700/50" 
                : "bg-gray-50/50 hover:bg-gray-100/50 text-gray-700 border border-gray-200/50"
              }
            `}
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            onKeyDown={(e) => handleKeyDown(e, () => setIsMenuOpen(!isMenuOpen))}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            variant="ghost"
          >
            <Box className={`transition-transform duration-300 ${isMenuOpen ? "rotate-180" : "rotate-0"}`}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Box>
          </Button>
        </Container>
      </Box>

      {/* Mobile Menu Overlay */}
      <Box
        display={{ base: 'block', xl: 'none' }}
        className={`
          fixed inset-0 bg-black/60 backdrop-blur-sm z-[9990] transition-all duration-500
          ${isMenuOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"}
        `}
        onClick={() => setIsMenuOpen(false)}
      />
      
      {/* Mobile Menu Sidebar */}
      <Box 
        display={{ base: 'block', xl: 'none' }}
        className={`
          fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] z-[9995] border-r shadow-2xl backdrop-blur-xl 
          overflow-hidden transition-all duration-500
          ${isDarkMode ? "bg-gray-900/98 border-gray-700/50" : "bg-white/98 border-gray-200/50"}
          ${isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}
        `}
      style={{
        transform: isMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
      }}
      >
        {/* Mobile Menu Header */}
        <Flex className="items-center justify-between p-6 border-b border-opacity-50">
          <Button
            onClick={() => setIsMenuOpen(false)}
            variant="ghost"
            className={`
              p-2 rounded-xl transition-all duration-300 transform hover:scale-110
              ${isDarkMode ? "bg-gray-800/50 hover:bg-gray-700/50 text-white" : "bg-gray-50/50 hover:bg-gray-100/50 text-gray-700"}
            `}
          >
            <X className="h-5 w-5" />
          </Button>
        </Flex>

        {/* Mobile Menu Content */}
        <Box className="p-6 space-y-2 overflow-y-auto flex-1" style={{ height: 'calc(100vh - 80px)', paddingBottom: '8rem' }}>
          {navLinks.map((link, index) => (
            <Box
              key={link.href}
              style={{ 
                animationDelay: `${index * 100}ms`,
                animation: `slideInLeft 0.6s ease-out ${index * 100}ms both`
              }}
            >
              <NavLink 
                link={link} 
                isMobile
                activeLink={activeLink}
                hoveredLink={hoveredLink}
                onNavClick={(href) => {
                  handleNavClick(href);
                  setIsMenuOpen(false);
                }}
                onHover={setHoveredLink}
                isDarkMode={isDarkMode}
              />
            </Box>
          ))}

          {/* Mobile Community Section */}
          {/* <Box
            className={`
              rounded-xl border transition-all duration-300 mt-6
              ${isDarkMode ? "border-gray-700/50 bg-gray-800/30" : "border-gray-200/50 bg-gray-50/30"}
            `}
            style={{ 
              animationDelay: `${navLinks.length * 100}ms`,
              animation: `slideInLeft 0.6s ease-out ${navLinks.length * 100}ms both`
            }}
          >
            <Box className={`px-4 py-3 font-semibold text-sm border-b border-opacity-50 ${
              isDarkMode ? "text-gray-400 border-gray-700" : "text-gray-500 border-gray-200"
            }`}>
              Community
            </Box>
            {dropdownItems.map((item, index) => (
              <Button
                key={item.href}
                onClick={() => handleDropdownItemClick(item.href)}
                variant="ghost"
                className={`
                  flex items-center gap-3 px-4 py-4 text-base font-medium transition-all duration-300 
                  w-full text-left transform hover:scale-[1.02]
                  ${isDarkMode
                    ? "text-gray-300 hover:bg-gray-700/50 hover:text-blue-400"
                    : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
                  }
                  ${index === dropdownItems.length - 1 ? "rounded-b-xl" : ""}
                `}
              >
                <Text as="span" className="text-lg">{item.icon}</Text>
                <Flex className="flex-col">
                  <Text as="span">{item.label}</Text>
                  <Text as="span" className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {item.description}
                  </Text>
                </Flex>
              </Button>
            ))}
          </Box> */}

          {/* Mobile CTA Button */}
          {!user && signInButton && (
            <Box
              className="pt-6"
              style={{ 
                animationDelay: `${(navLinks.length + dropdownItems.length + 1) * 100}ms`,
                animation: `slideInLeft 0.6s ease-out ${(navLinks.length + dropdownItems.length + 1) * 100}ms both`
              }}
            >
              <Button
                onClick={() => {
                  setIsMenuOpen(false);
                  onSignInOpen();
                }}
                className={`
                  w-full px-6 py-4 rounded-xl text-base font-semibold transition-all duration-300 
                  transform hover:scale-[1.02] flex items-center justify-center gap-2
                  ${isDarkMode
                    ? "bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white shadow-lg shadow-blue-900/30"
                    : "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-200/50"
                  }
                `}
              >
                <Sparkles className="w-4 h-4" />
                {signInButton.label}
              </Button>
            </Box>
          )}

          {/* Theme Toggle - Commented out */}
          {/* <Box
            className="pt-4"
            style={{ 
              animationDelay: `${(navLinks.length + dropdownItems.length + 2) * 100}ms`,
              animation: `slideInLeft 0.6s ease-out ${(navLinks.length + dropdownItems.length + 2) * 100}ms both`
            }}
          >
            <Button
              onClick={toggleTheme}
              variant="ghost"
              className={`
                w-full flex items-center justify-center gap-3 py-4 px-4 rounded-xl 
                transition-all duration-300 transform hover:scale-[1.02]
                ${isDarkMode 
                  ? "bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-yellow-400" 
                  : "bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 text-blue-600"
                }
              `}
            >
              <Box className={`transition-transform duration-500 ${isDarkMode ? "rotate-0" : "rotate-[360deg]"}`}>
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Box>
              <Text as="span" className="font-semibold">
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </Text>
            </Button>
          </Box> */}
        </Box>
      </Box>

      {/* CSS Animations */}
      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }
      `}</style>

      {/* SignIn Modal */}
      <Modal isOpen={isSignInOpen} onClose={onSignInClose} size="xl" >
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent p={5}>
          <ModalCloseButton />
          <ModalBody>
            <SignIn onClose={onSignInClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
