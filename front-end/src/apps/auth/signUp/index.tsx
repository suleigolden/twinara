import {
  Box,
  Flex,
  Heading,
  Text,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalCloseButton,
} from "@chakra-ui/react";
import { SignUpForm } from "./SignUpForm";
import { Logo } from "~/components/icons/Logo";

type SignUpProps = {
  onSignInClick?: () => void;
}

export const SignUp = ({ onSignInClick }: SignUpProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Text color="gray.700" fontWeight="400" fontSize="14px">
        Not registered yet?{" "}
        <Text
          color="brand.500"
          as="span"
          ms="5px"
          fontWeight="500"
          cursor="pointer"
          onClick={onOpen}
        >
          Create an Account
        </Text>
      </Text>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay backdropFilter="blur(4px)" />
        <ModalContent p={5}>
          <ModalCloseButton />
          <ModalBody>
            <Flex
              direction="column"
              maxW="100%"
              background="white"
              borderRadius="20px"
              p={0}
            >
              <Box mb={8}>
                <Heading
                  color="navy.700"
                  fontSize="36px"
                  mb="10px"
                  fontWeight="700"
                >
                  Sign up to <Logo />
                </Heading>
                {/* <Text color="gray.700" fontSize="md">
                  Create your account and start your cognitive training journey
                </Text> */}
              </Box>

              <SignUpForm />

              <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                maxW="100%"
                mt={6}
              >
                <Text color="gray.700" fontWeight="400" fontSize="14px">
                  Already have an account?{" "}
                  <Text
                    color="brand.500"
                    as="span"
                    ms="5px"
                    fontWeight="500"
                    cursor="pointer"
                    onClick={() => {
                      onClose();
                      onSignInClick?.();
                    }}
                  >
                    Sign in
                  </Text>
                </Text>
              </Flex>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
