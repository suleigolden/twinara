import {
  Box,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { forwardRef, useImperativeHandle, useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { useDementiaUserOnboarding } from "~/hooks/use-dementia-user-onboarding";
import { CustomInputField } from "~/components/fields/CustomInputField";
import { OnboardingStepper } from "./OnboardingStepper";
import { useDementiaUserProfile } from "~/hooks/use-dementia-user-profile";

type DementiaUserBioProps = {
  onNext?: () => void;
  activeStep: number;
  steps: any;
  shouldDisplayStepper?: boolean;
  onUserInfoValidChange?: (isValid: boolean) => void;
};

export const DementiaUserBio = forwardRef<
  { submitForm: () => Promise<void> },
  DementiaUserBioProps
>(({ onNext, activeStep, steps, shouldDisplayStepper = true, onUserInfoValidChange }, ref) => {
  const { methods, handleSubmit } = useDementiaUserOnboarding();
  const { dementiaUserProfile } = useDementiaUserProfile();
  const { setValue, watch, formState: { errors } } = methods;

  const maxBioLength = 70000;
  const maxNotesLength = 5000;

  // Watch bio field for character count
  const bioValue = watch("bio") || "";
  const bioCharacterCount = bioValue.length;

  // Watch notes field for character count
  const notesValue = watch("notesFromCaregiver") || "";
  const notesCharacterCount = notesValue.length;

  // Handle bio input with max length enforcement
  const handleBioChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLTextAreaElement;
    let value = target.value;
    
    // Enforce max length
    if (value.length > maxBioLength) {
      value = value.slice(0, maxBioLength);
      // Update the textarea element to reflect the truncated value
      target.value = value;
    }
    
    // Update form state
    setValue("bio", value, { shouldValidate: true, shouldDirty: true });
  };

  // Handle notes input with max length enforcement
  const handleNotesChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLTextAreaElement;
    let value = target.value;
    
    // Enforce max length
    if (value.length > maxNotesLength) {
      value = value.slice(0, maxNotesLength);
      // Update the textarea element to reflect the truncated value
      target.value = value;
    }
    
    // Update form state
    setValue("notesFromCaregiver", value, { shouldValidate: true, shouldDirty: true });
  };

  // Initialize form with existing data
  useEffect(() => {
    if (dementiaUserProfile) {
      if (dementiaUserProfile.bio) {
        setValue("bio", dementiaUserProfile.bio);
      }
      if (dementiaUserProfile.notesFromCaregiver) {
        setValue("notesFromCaregiver", dementiaUserProfile.notesFromCaregiver);
      }
    }
  }, [dementiaUserProfile, setValue]);

  useImperativeHandle(ref, () => ({
    submitForm: handleSubmit,
  }));

  return (
    <FormProvider {...methods}>
      <VStack spacing={8} align="center" w="full">
        <Box
          w="full"
          maxW="720px"
          bg="white"
          borderRadius="2xl"
        >
          {shouldDisplayStepper && <OnboardingStepper activeStep={activeStep} steps={steps} />}
          <Box
            w="full"
            bg="brand.500"
            color="white"
            borderRadius="8px 8px 0 0"
            boxShadow="lg"
            p={{ base: 6, md: 10 }}
          >
            <Heading size="lg" mb={2}>Bio and Notes from Caregiver</Heading>
            <Text fontSize="md">
              Share information about yourself to help us provide better support and assistance with daily activities and routines.
            </Text>
          </Box>
          <VStack spacing={6} w="full" align="stretch" p={{ base: 6, md: 10 }} boxShadow="lg">
            <Box>
              <Text fontSize="sm" color="gray.700" mb={4} lineHeight="tall">
                The more detailed information you provide, the better Twinara will be able to help, guide, and support you with your daily activities, routines, and more personalized assistance.
              </Text>
            </Box>

            <Box>
              <CustomInputField
                type="textarea"
                label="Biography and Additional Information"
                registerName="bio"
                isError={errors?.bio}
                placeholder="Tell us about yourself, your interests, preferences, daily routines, or anything else that would help us provide better support..."
                onChange={handleBioChange}
                maxLength={maxBioLength}
              />
              <Text 
                fontSize="xs" 
                color={bioCharacterCount >= maxBioLength ? "red.500" : "gray.500"} 
                mt={1}
              >
                {bioCharacterCount.toLocaleString()} / {maxBioLength.toLocaleString()} characters
                {bioCharacterCount >= maxBioLength && " (Maximum reached)"}
              </Text>
            </Box>

            <Box>
              <CustomInputField
                type="textarea"
                label="Notes from Caregiver (Optional)"
                registerName="notesFromCaregiver"
                isError={errors?.notesFromCaregiver}
                placeholder="Any additional notes, preferences, or important information from caregivers that would be helpful..."
                onChange={handleNotesChange}
                maxLength={maxNotesLength}
              />
              <Text 
                fontSize="xs" 
                color={notesCharacterCount >= maxNotesLength ? "red.500" : "gray.500"} 
                mt={1}
              >
                {notesCharacterCount.toLocaleString()} / {maxNotesLength.toLocaleString()} characters
                {notesCharacterCount >= maxNotesLength && " (Maximum reached)"}
              </Text>
            </Box>

            <Box p={4} bg="blue.50" borderRadius="md" borderWidth="1px" borderColor="blue.200">
              <Text fontSize="sm" color="blue.900" fontWeight="500" mb={2}>
                💡 Why this information helps:
              </Text>
              <VStack align="start" spacing={1} fontSize="xs" color="blue.800">
                <Text>• Better understanding of daily routines and preferences</Text>
                <Text>• Personalized activity suggestions and reminders</Text>
                <Text>• Improved communication and interaction</Text>
                <Text>• Enhanced care coordination and support</Text>
              </VStack>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </FormProvider>
  );
});