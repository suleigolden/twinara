import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Button,
  IconButton,
  Checkbox,
  SimpleGrid,
} from "@chakra-ui/react";
import { forwardRef, useImperativeHandle, useEffect } from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import { useDementiaUserOnboarding } from "~/hooks/use-dementia-user-onboarding";
import { CustomInputField } from "~/components/fields/CustomInputField";
import { OnboardingStepper } from "./OnboardingStepper";
import { useDementiaUserActivities } from "~/hooks/use-dementia-user-activities";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";

const MAX_ACTIVITIES = 10;

const DAYS_OF_WEEK = [
  { label: "Sunday", value: "0" },
  { label: "Monday", value: "1" },
  { label: "Tuesday", value: "2" },
  { label: "Wednesday", value: "3" },
  { label: "Thursday", value: "4" },
  { label: "Friday", value: "5" },
  { label: "Saturday", value: "6" },
];

type DementiaUserActivitiesProps = {
  onNext?: () => void;
  activeStep: number;
  steps: any;
  shouldDisplayStepper?: boolean;
  onUserInfoValidChange?: (isValid: boolean) => void;
};

// Activity Item Component
const ActivityItem = ({ index, onRemove }: { index: number; onRemove: () => void }) => {
  const { watch, setValue, formState: { errors } } = useFormContext();
  const activity = watch(`activities.${index}`) || {};

  const updateActivity = (field: string, value: any) => {
    const activities = watch("activities") || [];
    const updated = [...activities];
    updated[index] = { ...updated[index], [field]: value };
    setValue("activities", updated);
  };

  return (
    <Box p={4} borderWidth="1px" borderRadius="md" borderColor="gray.200" bg="gray.50">
      <HStack justify="space-between" mb={4}>
        <Heading size="sm">Activity {index + 1}</Heading>
        <IconButton
          aria-label="Remove activity"
          icon={<DeleteIcon />}
          onClick={onRemove}
          colorScheme="red"
          variant="ghost"
          size="sm"
        />
      </HStack>

      <VStack spacing={4} align="stretch">
        <CustomInputField
          type="text"
          label="Title *"
          registerName={`activities.${index}.title`}
          isError={(errors?.activities as any)?.[index]?.title}
          placeholder="e.g., Morning Walk, Reading Time"
          isRequired
          onChange={(e) => updateActivity("title", e.target.value)}
        />

        <CustomInputField
          type="textarea"
          label="Description"
          registerName={`activities.${index}.description`}
          isError={(errors?.activities as any)?.[index]?.description}
          placeholder="Describe the activity"
          onChange={(e) => updateActivity("description", e.target.value)}
        />

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          <CustomInputField
            type="select"
            label="Day of Week"
            registerName={`activities.${index}.dayOfWeek`}
            options={DAYS_OF_WEEK}
            isError={(errors?.activities as any)?.[index]?.dayOfWeek}
            placeholder="Select day"
            onChange={(e) => updateActivity("dayOfWeek", e.target.value ? parseInt(e.target.value) : undefined)}
          />

          <CustomInputField
            type="time"
            label="Time of Day (HH:mm:ss)"
            registerName={`activities.${index}.timeOfDay`}
            isError={(errors?.activities as any)?.[index]?.timeOfDay}
            placeholder="e.g., 09:00:00"
            description="Format: HH:mm:ss (24-hour format)"
            onChange={(e) => updateActivity("timeOfDay", e.target.value)}
          />
        </SimpleGrid>

        <CustomInputField
          type="datetime-local"
          label="Start Date & Time"
          registerName={`activities.${index}.startDatetime`}
          isError={(errors?.activities as any)?.[index]?.startDatetime}
          placeholder="YYYY-MM-DDTHH:mm or ISO date string"
          description="Format: YYYY-MM-DDTHH:mm (e.g., 2024-01-15T10:00)"
          onChange={(e) => updateActivity("startDatetime", e.target.value)}
        />

        <CustomInputField
          type="text"
          label="Location"
          registerName={`activities.${index}.location`}
          isError={(errors?.activities as any)?.[index]?.location}
          placeholder="e.g., Central Park, Home - Living Room"
          onChange={(e) => updateActivity("location", e.target.value)}
        />

        <HStack spacing={6}>
          <Checkbox
            isChecked={activity.isRecurring || false}
            onChange={(e) => updateActivity("isRecurring", e.target.checked)}
          >
            Recurring Activity
          </Checkbox>
          <Checkbox
            isChecked={activity.isActive !== false}
            defaultChecked={true}
            onChange={(e) => updateActivity("isActive", e.target.checked)}
          >
            Active
          </Checkbox>
        </HStack>
      </VStack>
    </Box>
  );
};

export const DementiaUserActivities = forwardRef<
  { submitForm: () => Promise<void> },
  DementiaUserActivitiesProps
>(({ onNext, activeStep, steps, shouldDisplayStepper = true, onUserInfoValidChange }, ref) => {
  const { methods, handleSubmit } = useDementiaUserOnboarding();
  const { dementiaUserActivities } = useDementiaUserActivities();
  const { setValue, watch } = methods;

  const activities = watch("activities") || [];

  const addActivity = () => {
    if (activities.length < MAX_ACTIVITIES) {
      setValue("activities", [
        ...activities,
        {
          title: "",
          description: "",
          dayOfWeek: undefined,
          timeOfDay: "",
          startDatetime: undefined,
          location: "",
          isRecurring: false,
          isActive: true,
        },
      ]);
    }
  };

  const removeActivity = (index: number) => {
    const updated = activities.filter((_: any, i: number) => i !== index);
    setValue("activities", updated);
  };

  // Initialize form with existing activities data
  useEffect(() => {
    if (dementiaUserActivities && dementiaUserActivities.length > 0) {
      const formattedActivities = dementiaUserActivities.map((activity) => {
        // Convert startDatetime to datetime-local format (YYYY-MM-DDTHH:mm)
        let startDatetimeString: string | undefined;
        if (activity.startDatetime) {
          const date = new Date(activity.startDatetime);
          // Format: YYYY-MM-DDTHH:mm (datetime-local format)
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          const hours = String(date.getHours()).padStart(2, '0');
          const minutes = String(date.getMinutes()).padStart(2, '0');
          startDatetimeString = `${year}-${month}-${day}T${hours}:${minutes}`;
        }

        // Convert timeOfDay to HH:mm format (time input expects HH:mm, not HH:mm:ss)
        let timeOfDayString: string | undefined;
        if (activity.timeOfDay) {
          // If format is HH:mm:ss, take only HH:mm
          timeOfDayString = activity.timeOfDay.substring(0, 5);
        }

        return {
          title: activity.title || "",
          description: activity.description || "",
          dayOfWeek: activity.dayOfWeek ?? undefined,
          timeOfDay: timeOfDayString || "",
          startDatetime: startDatetimeString,
          location: activity.location || "",
          isRecurring: activity.isRecurring ?? false,
          isActive: activity.isActive !== false,
        };
      });
      setValue("activities", formattedActivities as any);
    }
  }, [dementiaUserActivities, setValue]);

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
            <Heading size="lg" mb={2}>Activities</Heading>
            <Text fontSize="md">
              Add activities to help structure daily routines and schedules (up to {MAX_ACTIVITIES} activities).
            </Text>
          </Box>
          <VStack spacing={6} w="full" align="stretch" p={{ base: 6, md: 10 }} boxShadow="lg">
            <VStack spacing={4} align="stretch">
              {activities.map((_: any, index: number) => (
                <ActivityItem
                  key={index}
                  index={index}
                  onRemove={() => removeActivity(index)}
                />
              ))}
              {activities.length === 0 && (
                <Box p={8} textAlign="center" borderWidth="2px" borderStyle="dashed" borderRadius="md" borderColor="gray.300">
                  <Text fontSize="sm" color="gray.500" fontStyle="italic">
                    No activities added yet. Click "Add Activity" to get started.
                  </Text>
                  <Text fontSize="xs" color="gray.400" mt={2}>
                    Activities help create structure and routine in daily life.
                  </Text>
                </Box>
              )}
            </VStack>
            <HStack justify="space-between">
              <Text fontSize="sm" color="gray.600">
                {activities.length} of {MAX_ACTIVITIES} activities added
              </Text>
              <Button
                size="sm"
                leftIcon={<AddIcon />}
                onClick={addActivity}
                isDisabled={activities.length >= MAX_ACTIVITIES}
                colorScheme="brand"
                variant="outline"
              >
                Add Activity
              </Button>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </FormProvider>
  );
});