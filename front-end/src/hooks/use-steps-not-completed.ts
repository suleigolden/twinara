import { DementiaProfile, DementiaUserActivity } from "@suleigolden/the-last-spelling-bee-api-client";
import { useEffect, useState } from "react";
import { useUser } from "./use-user";
import { useDementiaUserProfile } from "./use-dementia-user-profile";
import { useDementiaUserActivities } from "./use-dementia-user-activities";

export const useStepsNotCompleted = () => {
  const { user } = useUser();
  const [stepsNotCompleted, setStepsNotCompleted] = useState<{ 
    dementiaUserProfile: DementiaProfile | undefined,
    dementiaUserActivities: DementiaUserActivity[] | undefined
  }>();
  const { dementiaUserProfile, isLoading: isUserProfileLoading } = useDementiaUserProfile();
  const { dementiaUserActivities, isLoading: isDementiaUserActivitiesLoading } = useDementiaUserActivities();
  const [isLoading, setIsLoading] = useState(true);
  const urlParams = window.location.href;
 
  useEffect(() => {
    // Wait for both profiles to finish loading before processing
    if (isUserProfileLoading || isDementiaUserActivitiesLoading) {
      return;
    }

    const fetchStepsNotCompleted = async () => {
      setIsLoading(true);
      try {
        if (!dementiaUserProfile && !dementiaUserActivities && urlParams.includes("step")) {
          window.location.href = `/user/${user?.id}/dementia-user/onboarding`;
        } else {
          setStepsNotCompleted({ dementiaUserProfile: dementiaUserProfile || undefined, dementiaUserActivities: dementiaUserActivities || undefined });
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchStepsNotCompleted();
  }, [isUserProfileLoading, isDementiaUserActivitiesLoading, dementiaUserProfile, dementiaUserActivities, urlParams, user?.id]);

  return { stepsNotCompleted, isLoading };
};
