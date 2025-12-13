import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import { forwardRef, useImperativeHandle, useEffect } from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import { useDementiaUserOnboarding } from "~/hooks/use-dementia-user-onboarding";
import { CustomInputField } from "~/components/fields/CustomInputField";
import { OnboardingStepper } from "./OnboardingStepper";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { useDementiaUserProfile } from "~/hooks/use-dementia-user-profile";

const MAX_ITEMS = 10;

type DementiaUserWorkAndHobbiesProps = {
  onNext?: () => void;
  activeStep: number;
  steps: any;
  shouldDisplayStepper?: boolean;
  onUserInfoValidChange?: (isValid: boolean) => void;
};

// Work History Section
const WorkHistorySection = () => {
  const { watch, setValue, formState: { errors } } = useFormContext();
  const workHistory = watch("workHistory") || [];

  const addWorkHistory = () => {
    if (workHistory.length < MAX_ITEMS) {
      setValue("workHistory", [...workHistory, ""]);
    }
  };

  const removeWorkHistory = (index: number) => {
    const updated = workHistory.filter((_: string, i: number) => i !== index);
    setValue("workHistory", updated);
  };

  const updateWorkHistory = (index: number, value: string) => {
    const updated = [...workHistory];
    updated[index] = value;
    setValue("workHistory", updated);
  };

  return (
    <Box>
      <HStack justify="space-between" mb={4}>
        <Heading size="md">Work History</Heading>
        <Button
          size="sm"
          leftIcon={<AddIcon />}
          onClick={addWorkHistory}
          isDisabled={workHistory.length >= MAX_ITEMS}
          colorScheme="brand"
          variant="outline"
        >
          Add Work History
        </Button>
      </HStack>
      <Text fontSize="sm" color="gray.600" mb={4}>
        Share your work experience (up to {MAX_ITEMS} entries)
      </Text>
      <VStack spacing={3} align="stretch">
        {workHistory.map((item: string, index: number) => (
          <HStack key={index} spacing={2}>
            <CustomInputField
              type="text"
              label={`Work History ${index + 1}`}
              registerName={`workHistory.${index}`}
              isError={(errors?.workHistory as any)?.[index]}
              placeholder="e.g., Worked as a teacher for 30 years"
              onChange={(e) => updateWorkHistory(index, e.target.value)}
            />
            <IconButton
              aria-label="Remove work history"
              icon={<DeleteIcon />}
              onClick={() => removeWorkHistory(index)}
              colorScheme="red"
              variant="ghost"
              mt={8}
            />
          </HStack>
        ))}
        {workHistory.length === 0 && (
          <Text fontSize="sm" color="gray.500" fontStyle="italic">
            No work history added yet. Click "Add Work History" to get started.
          </Text>
        )}
      </VStack>
    </Box>
  );
};

// Hobbies Section
const HobbiesSection = () => {
  const { watch, setValue, formState: { errors } } = useFormContext();
  const hobbies = watch("hobbies") || [];

  const addHobby = () => {
    if (hobbies.length < MAX_ITEMS) {
      setValue("hobbies", [...hobbies, ""]);
    }
  };

  const removeHobby = (index: number) => {
    const updated = hobbies.filter((_: string, i: number) => i !== index);
    setValue("hobbies", updated);
  };

  const updateHobby = (index: number, value: string) => {
    const updated = [...hobbies];
    updated[index] = value;
    setValue("hobbies", updated);
  };

  return (
    <Box>
      <HStack justify="space-between" mb={4}>
        <Heading size="md">Hobbies</Heading>
        <Button
          size="sm"
          leftIcon={<AddIcon />}
          onClick={addHobby}
          isDisabled={hobbies.length >= MAX_ITEMS}
          colorScheme="brand"
          variant="outline"
        >
          Add Hobby
        </Button>
      </HStack>
      <Text fontSize="sm" color="gray.600" mb={4}>
        Share your hobbies and interests (up to {MAX_ITEMS} entries)
      </Text>
      <VStack spacing={3} align="stretch">
        {hobbies.map((item: string, index: number) => (
          <HStack key={index} spacing={2}>
            <CustomInputField
              type="text"
              label={`Hobby ${index + 1}`}
              registerName={`hobbies.${index}`}
              isError={(errors?.hobbies as any)?.[index]}
              placeholder="e.g., Reading, Gardening, Music"
              onChange={(e) => updateHobby(index, e.target.value)}
            />
            <IconButton
              aria-label="Remove hobby"
              icon={<DeleteIcon />}
              onClick={() => removeHobby(index)}
              colorScheme="red"
              variant="ghost"
              mt={8}
            />
          </HStack>
        ))}
        {hobbies.length === 0 && (
          <Text fontSize="sm" color="gray.500" fontStyle="italic">
            No hobbies added yet. Click "Add Hobby" to get started.
          </Text>
        )}
      </VStack>
    </Box>
  );
};

// Important Dates Section
const ImportantDatesSection = () => {
  const { watch, setValue, formState: { errors } } = useFormContext();
  const importantDates = watch("importantDates") || [];

  const addImportantDate = () => {
    if (importantDates.length < MAX_ITEMS) {
      setValue("importantDates", [...importantDates, { label: "", date: "" }]);
    }
  };

  const removeImportantDate = (index: number) => {
    const updated = importantDates.filter((_: any, i: number) => i !== index);
    setValue("importantDates", updated);
  };

  const updateImportantDate = (index: number, field: "label" | "date", value: string) => {
    const updated = [...importantDates];
    updated[index] = { ...updated[index], [field]: value };
    setValue("importantDates", updated);
  };

  return (
    <Box>
      <HStack justify="space-between" mb={4}>
        <Heading size="md">Important Dates</Heading>
        <Button
          size="sm"
          leftIcon={<AddIcon />}
          onClick={addImportantDate}
          isDisabled={importantDates.length >= MAX_ITEMS}
          colorScheme="brand"
          variant="outline"
        >
          Add Important Date
        </Button>
      </HStack>
      <Text fontSize="sm" color="gray.600" mb={4}>
        Add significant dates like anniversaries, birthdays, etc. (up to {MAX_ITEMS} entries)
      </Text>
      <VStack spacing={4} align="stretch">
        {importantDates.map((item: { label: string; date: string }, index: number) => (
          <Box key={index} p={4} borderWidth="1px" borderRadius="md" borderColor="gray.200">
            <HStack spacing={2} mb={3}>
              <CustomInputField
                type="text"
                label={`Label ${index + 1}`}
                registerName={`importantDates.${index}.label`}
                isError={(errors?.importantDates as any)?.[index]?.label}
                placeholder="e.g., Anniversary, Birthday"
                onChange={(e) => updateImportantDate(index, "label", e.target.value)}
              />
              <CustomInputField
                type="date"
                label={`Date ${index + 1}`}
                registerName={`importantDates.${index}.date`}
                isError={(errors?.importantDates as any)?.[index]?.date}
                placeholder="Select date"
                onChange={(e) => updateImportantDate(index, "date", e.target.value)}
              />
              <IconButton
                aria-label="Remove important date"
                icon={<DeleteIcon />}
                onClick={() => removeImportantDate(index)}
                colorScheme="red"
                variant="ghost"
                mt={8}
              />
            </HStack>
          </Box>
        ))}
        {importantDates.length === 0 && (
          <Text fontSize="sm" color="gray.500" fontStyle="italic">
            No important dates added yet. Click "Add Important Date" to get started.
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export const DementiaUserWorkAndHobbies = forwardRef<
  { submitForm: () => Promise<void> },
  DementiaUserWorkAndHobbiesProps
>(({ onNext, activeStep, steps, shouldDisplayStepper = true, onUserInfoValidChange }, ref) => {
  const { methods, handleSubmit } = useDementiaUserOnboarding();
  const { dementiaUserProfile } = useDementiaUserProfile();
  const { setValue, watch } = methods;

  // Initialize form with existing data
  useEffect(() => {
    if (dementiaUserProfile) {
      // Initialize arrays if they don't exist
      setValue("workHistory", dementiaUserProfile.workHistory || []);
      setValue("hobbies", dementiaUserProfile.hobbies || []);
      setValue("importantDates", dementiaUserProfile.importantDates?.map(date => ({
        label: date.label,
        date: typeof date.date === 'string' 
          ? date.date 
          : new Date(date.date).toISOString().split('T')[0],
      })) || []);
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
            <Heading size="lg" mb={2}>Work and Hobbies</Heading>
            <Text fontSize="md">
              Share your work history, hobbies, and important dates to help us know you better.
            </Text>
          </Box>
          <VStack spacing={8} w="full" align="stretch" p={{ base: 6, md: 10 }} boxShadow="lg" >
            <WorkHistorySection />
            <Divider />
            <HobbiesSection />
            <Divider />
            <ImportantDatesSection />
          </VStack>
        </Box>
      </VStack>
    </FormProvider>
  );
});