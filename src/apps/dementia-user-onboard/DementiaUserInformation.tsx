import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Avatar,
  Button,
  useDisclosure,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { forwardRef, useImperativeHandle, useEffect } from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import { useDementiaUserOnboarding } from "~/hooks/use-dementia-user-onboarding";
import { CustomInputField } from "~/components/fields/CustomInputField";
import { useAvatarUpload } from "~/hooks/useAvatarUpload";
import { useDementiaUserProfile } from "~/hooks/use-dementia-user-profile";
import { DementiaProfile, Gender } from "@suleigolden/the-last-spelling-bee-api-client";
import { AvatarUploadModal } from "./components/AvatarUploadModal";
import { OnboardingStepper } from "./OnboardingStepper";

type DementiaUserInformationProps = {
  onNext?: () => void;
  activeStep: number;
  steps: any;
  shouldDisplayStepper?: boolean;
  onUserInfoValidChange?: (isValid: boolean) => void;
};

type AvatarUploadSectionProps = {
  dementiaUserProfile: DementiaProfile;
};

const AvatarUploadSection = ({ dementiaUserProfile }: AvatarUploadSectionProps) => {
  const { watch, setValue } = useFormContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const avatarUrl = watch("avatar_url") || dementiaUserProfile?.avatarUrl || "";
  const { uploadAvatar, isUploading } = useAvatarUpload((url) => {
    setValue("avatar_url", url);
  });

  const handleFileSelect = (file: File) => {
    uploadAvatar(file);
    onClose();
  };

  return (
    <FormControl>
      <FormLabel>Profile Photo</FormLabel>
      <Flex align="center" gap={4}>
        <Avatar size="xl" src={avatarUrl || undefined} name="User" />
        <VStack align="start" spacing={2}>
          <Button size="sm" onClick={onOpen} isLoading={isUploading}>
            {avatarUrl ? "Change Photo" : "Upload Photo"}
          </Button>
          <Text fontSize="xs" color="gray.500">
            PNG, JPG or JPEG (max. 5MB)
          </Text>
        </VStack>
      </Flex>
      <AvatarUploadModal
        isOpen={isOpen}
        onClose={onClose}
        onFileSelect={handleFileSelect}
        isUploading={isUploading}
      />
    </FormControl>
  );
};

export const DementiaUserInformation = forwardRef<
  { submitForm: () => Promise<void> },
  DementiaUserInformationProps
>(({ onNext, activeStep, steps, shouldDisplayStepper = true, onUserInfoValidChange }, ref) => {
  const { methods, handleSubmit } = useDementiaUserOnboarding();
  const { dementiaUserProfile } = useDementiaUserProfile();
  const {
    setValue,
    watch,
    formState: { errors },
  } = methods;

  // Watch required fields to determine if user info is valid
  const avatarUrl = watch("avatar_url");
  const firstName = watch("firstName");
  const lastName = watch("lastName");
  const dateOfBirth = watch("dob");
  const phoneNumber = watch("phoneNumber");
  const gender = watch("gender");

  const isUserInfoValid = !!(
    avatarUrl &&
    firstName &&
    lastName &&
    dateOfBirth &&
    phoneNumber &&
    gender
  );

  // Notify parent component about validation state
  useEffect(() => {
    onUserInfoValidChange?.(isUserInfoValid);
  }, [isUserInfoValid, onUserInfoValidChange]);

  // Initialize form with existing user profile data
  useEffect(() => {
    if (dementiaUserProfile) {
      // Basic Information fields
      setValue("avatar_url", dementiaUserProfile.avatarUrl || "");
      setValue("nickname", dementiaUserProfile.nickname || "");
      setValue("firstName", dementiaUserProfile.firstName || "");
      setValue("lastName", dementiaUserProfile.lastName || "");
      // Format date for input field (YYYY-MM-DD)
      const dateOfBirth = dementiaUserProfile.dob
        ? new Date(dementiaUserProfile.dob).toISOString().split('T')[0]
        : "";
      setValue("dob", dateOfBirth);
      setValue("gender", dementiaUserProfile.gender as "male" | "female" | "other" | undefined);
      setValue("phoneNumber", dementiaUserProfile.phoneNumber || "");
      setValue("email", dementiaUserProfile.email || "");
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
            <Heading size="lg" mb={2}>
              Hi{dementiaUserProfile?.firstName ? ` ${dementiaUserProfile.firstName}` : ''}! Tell us about yourself
            </Heading>
            <Text fontSize="md">
              Share some information to help customers get to know you better.
            </Text>
          </Box>
          <VStack spacing={6} w="full" align="stretch" p={{ base: 6, md: 10 }} boxShadow="lg">
            <AvatarUploadSection dementiaUserProfile={dementiaUserProfile as DementiaProfile} />

            <CustomInputField
              type="text"
              label="Nickname (Optional)"
              registerName="nickname"
              isError={errors?.nickname}
              placeholder="Enter your nickname"
            />

            <CustomInputField
              type="text"
              label="First Name"
              registerName="firstName"
              isError={errors?.firstName}
              placeholder="Enter your first name"
              autoComplete="given-name"
              isRequired={true}
            />

            <CustomInputField
              type="text"
              label="Last Name"
              registerName="lastName"
              isError={errors?.lastName}
              placeholder="Enter your last name"
              autoComplete="family-name"
              isRequired={true}
            />

            <CustomInputField
              type="date"
              label="Date of Birth"
              registerName="dob"
              isError={errors?.dob}
              placeholder="Select your date of birth"
              isRequired={true}
            />

            <CustomInputField
              type="select"
              label="Gender"
              registerName="gender"
              options={Object.values(Gender).map((gender) => ({ label: gender, value: gender }))}
              isError={errors?.gender}
              placeholder="Select your gender"
              isRequired={true}
            />

            <CustomInputField
              type="text"
              label="Phone Number (Emergency contact)"
              registerName="phoneNumber"
              isError={errors?.phoneNumber}
              placeholder="Enter your phone number (emergency contact)"
              autoComplete="tel"
              maxLength={20}
              isRequired={true}
            />

          </VStack>
        </Box>
      </VStack>
    </FormProvider>
  );
});
