import { Modal, ModalOverlay, ModalContent, ModalBody } from "@chakra-ui/react";
import { CategorySelection } from "./components/CategorySelection";
import { QuestionCategory } from "./types";

type ChooseYourActivityModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (category: QuestionCategory) => void;
  disabled?: boolean;
};

export const ChooseYourActivityModal = ({ 
  isOpen, 
  onClose, 
  onSelectCategory,
  disabled = false 
}: ChooseYourActivityModalProps) => {
  const handleSelectCategory = (category: QuestionCategory) => {
    onSelectCategory(category);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" closeOnOverlayClick={!disabled}>
      <ModalOverlay backdropFilter="blur(4px)" />
      <ModalContent py={6}>
        <ModalBody>
          <CategorySelection onSelectCategory={handleSelectCategory} disabled={disabled} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};