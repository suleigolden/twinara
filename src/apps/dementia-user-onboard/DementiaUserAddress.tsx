import {
  Box,
  VStack,
  Heading,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { forwardRef, useImperativeHandle, useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { CustomInputField } from "~/components/fields/CustomInputField";
import { LocationSearchInput } from "./components/LocationSearchInput";
import { OnboardingStepper } from "./OnboardingStepper";
import { useDementiaUserOnboarding } from "~/hooks/use-dementia-user-onboarding";
import { useDementiaUserProfile } from "~/hooks/use-dementia-user-profile";

type DementiaUserAddressProps = {
  onNext?: () => void;
  activeStep: number;
  steps: any;
  shouldDisplayStepper?: boolean;
  onLocationValidChange?: (isValid: boolean) => void;
};

export const DementiaUserAddress = forwardRef<
  { submitForm: () => Promise<void> },
  DementiaUserAddressProps
>(({ onNext, activeStep, steps, shouldDisplayStepper = true, onLocationValidChange }, ref) => {
  const { methods, handleSubmit } = useDementiaUserOnboarding();
  const { dementiaUserProfile } = useDementiaUserProfile();
  const { setValue, watch, formState: { errors } } = methods;

  const [selectedLocation, setSelectedLocation] = React.useState<{
    lat: number;
    lng: number;
    address: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  } | null>(null);

  // Build address string from saved address for LocationSearchInput
  const savedAddress = dementiaUserProfile?.address;
  const addressString = savedAddress
    ? [
        savedAddress.street,
        savedAddress.city,
        savedAddress.state,
        savedAddress.country,
        savedAddress.postal_code,
      ]
        .filter(Boolean)
        .join(', ')
    : '';

  // Watch address fields to determine if location is valid
  const addressStreet = watch('address.street');
  const addressCity = watch('address.city');
  const addressState = watch('address.state');
  const addressCountry = watch('address.country');
  const hasFormAddress = !!(addressStreet || addressCity || addressState || addressCountry);
  const hasSavedAddress = !!(savedAddress?.street || savedAddress?.city || savedAddress?.state || savedAddress?.country);
  const isLocationValid = hasFormAddress || hasSavedAddress;

  useImperativeHandle(ref, () => ({
    submitForm: handleSubmit,
  }));

  // Notify parent component about location validity
  useEffect(() => {
    onLocationValidChange?.(isLocationValid);
  }, [isLocationValid, onLocationValidChange]);

  // Initialize form with saved address when component mounts
  useEffect(() => {
    if (savedAddress) {
      if (savedAddress.street) {
        setValue('address.street', savedAddress.street);
      }
      if (savedAddress.city) {
        setValue('address.city', savedAddress.city);
      }
      if (savedAddress.state) {
        setValue('address.state', savedAddress.state);
      }
      if (savedAddress.country) {
        setValue('address.country', savedAddress.country);
      }
      if (savedAddress.postal_code) {
        setValue('address.postal_code', savedAddress.postal_code);
      }
    }
  }, [savedAddress, setValue]);

  // Update form values when location is selected from LocationSearchInput
  useEffect(() => {
    if (selectedLocation) {
      // LocationSearchInput provides the full address string, we can parse or use individual fields
      if (selectedLocation.address) {
        setValue('address.street', selectedLocation.address);
      }
      if (selectedLocation.city) {
        setValue('address.city', selectedLocation.city);
      }
      if (selectedLocation.state) {
        setValue('address.state', selectedLocation.state);
      }
      if (selectedLocation.country) {
        setValue('address.country', selectedLocation.country);
      }
      if (selectedLocation.postalCode) {
        setValue('address.postal_code', selectedLocation.postalCode);
      }
    }
  }, [selectedLocation, setValue]);

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
            <Heading size="lg" mb={2}>Address Information</Heading>
            <Text fontSize="md">
              Please provide your address information to help us serve you better.
            </Text>
          </Box>
          <VStack spacing={6} w="full" align="stretch" p={{ base: 6, md: 10 }} boxShadow="lg">
            <Box>
              <Text fontSize="sm" fontWeight="500" mb={2} color="gray.700">
                Search for your address
              </Text>
              <LocationSearchInput
                onLocationSelect={(location) => setSelectedLocation(location)}
                initialValue={addressString}
              />
              <Text fontSize="xs" color="gray.500" mt={2}>
                Or fill in the address fields below manually
              </Text>
            </Box>

            <CustomInputField
              type="text"
              label="Street Address"
              registerName="address.street"
              isError={(errors?.address as any)?.street}
              placeholder="Enter street address"
              autoComplete="street-address"
            />

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <CustomInputField
                type="text"
                label="City"
                registerName="address.city"
                isError={(errors?.address as any)?.city}
                placeholder="Enter city"
                autoComplete="address-level2"
              />

              <CustomInputField
                type="text"
                label="State/Province"
                registerName="address.state"
                isError={(errors?.address as any)?.state}
                placeholder="Enter state or province"
                autoComplete="address-level1"
              />
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <CustomInputField
                type="text"
                label="Country"
                registerName="address.country"
                isError={(errors?.address as any)?.country}
                placeholder="Enter country"
                autoComplete="country"
              />

              <CustomInputField
                type="text"
                label="Postal Code"
                registerName="address.postal_code"
                isError={(errors?.address as any)?.postal_code}
                placeholder="Enter postal code"
                autoComplete="postal-code"
              />
            </SimpleGrid>
          </VStack>
        </Box>
      </VStack>
    </FormProvider>
  );
});