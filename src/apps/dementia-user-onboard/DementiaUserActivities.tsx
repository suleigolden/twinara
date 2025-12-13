import {
    Box,
    Heading,
    VStack,
  } from "@chakra-ui/react";
  import { forwardRef } from "react";
  import { FormProvider } from "react-hook-form";
  import { useDementiaUserOnboarding } from "~/hooks/use-dementia-user-onboarding"
  import { OnboardingStepper } from "./OnboardingStepper";
import { useDementiaUserActivities } from "~/hooks/use-dementia-user-activities";
  
  type DementiaUserActivitiesProps = {
    onNext?: () => void;
    activeStep: number;
    steps: any;
    shouldDisplayStepper?: boolean;
    onUserInfoValidChange?: (isValid: boolean) => void;
  };

  
  export const DementiaUserActivities = forwardRef<
    { submitForm: () => Promise<void> },
    DementiaUserActivitiesProps
  >(({ onNext, activeStep, steps, shouldDisplayStepper = true, onUserInfoValidChange }, ref) => {
    const { methods, handleSubmit } = useDementiaUserOnboarding();
    const { dementiaUserActivities } = useDementiaUserActivities();
    const {
      control,
      setValue,
      watch,
      formState: { errors },
    } = methods;
  
  
    return (
      <FormProvider {...methods}>
        <VStack spacing={8} align="center" w="full">
          <Box
            w="full"
            maxW="720px"
            bg="white"
            borderRadius="2xl"
            boxShadow="lg"
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
              <Heading size="lg" mb={2}>Activities</Heading>
          </Box>
          </Box>
        </VStack>
      </FormProvider>
    );
  });
  