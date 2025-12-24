import { 
    Modal, 
    ModalOverlay,
    ModalContent, 
    ModalBody, 
    Box, 
    Spinner, 
    Text, 
    VStack,
} from "@chakra-ui/react";
import { CategorySelection } from "./components/CategorySelection";
import { QuestionCategory } from "./types";
import { useEffect, useRef } from "react";

type ChooseYourActivityModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: QuestionCategory) => void;
  disabled?: boolean;
  isLoadingQuestions?: boolean;
};

export const ChooseYourActivityModal = ({ 
  isOpen, 
  onClose, 
  onSelectCategory,
  disabled = false,
  isLoadingQuestions = false
}: ChooseYourActivityModalProps) => {
  const prevLoadingRef = useRef(isLoadingQuestions);

  // Close modal when questions finish loading (isLoadingQuestions changes from true to false)
  useEffect(() => {
    if (prevLoadingRef.current && !isLoadingQuestions) {
      // Was loading, now finished - close the modal
      onClose();
    }
    prevLoadingRef.current = isLoadingQuestions;
  }, [isLoadingQuestions, onClose]);

  const handleSelectCategory = (category: QuestionCategory) => {
    // Don't close modal here - it will close after questions finish loading
    onSelectCategory(category);
  };
  return (
    <Modal 
      isOpen={isOpen} 
      onClose={isLoadingQuestions ? () => {} : onClose} 
      size="6xl" 
      closeOnOverlayClick={!isLoadingQuestions && !disabled}
      closeOnEsc={!isLoadingQuestions}
    >
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent py={6}>
        <ModalBody>
          <Box position="relative">
            {isLoadingQuestions && (
              <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bg="rgba(0,0,0,0.7)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                zIndex={10}
                borderRadius="xl"
              >
                <VStack spacing={4}>
                  <Spinner size="xl" color="green.500" />
                  <Text
                    fontSize="lg"
                    fontWeight="semibold"
                    color="white"
                  >
                    Loading questions...
                  </Text>
                </VStack>
              </Box>
            )}
            <CategorySelection onSelectCategory={handleSelectCategory} disabled={isLoadingQuestions || disabled} />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};