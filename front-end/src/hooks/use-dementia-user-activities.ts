import { api } from "~/redux-action/api.service";
import { useState, useEffect } from "react";
import { useSignOut } from "./use-sign-out";
import { useUser } from "./use-user";

// Define the type locally since we're no longer using the external API client
type DementiaUserActivity = {
    id: string;
    userId: string;
    title: string;
    description?: string;
    dayOfWeek?: string;
    timeOfDay?: string;
    startDatetime?: string;
    location?: string;
    isRecurring?: boolean;
    isActive?: boolean;
    createdAt?: string;
    updatedAt?: string;
};

export const useDementiaUserActivities = () => {
    const { user } = useUser();
    const signOut = useSignOut();
    const [dementiaUserActivities, setDementiaUserActivities] = useState<DementiaUserActivity[]>();
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchUserProfile = async () => {
        setIsLoading(true);
        try {
          const result = await api.service("dementia-user-activities").findByUserId(user?.id as string);
          setDementiaUserActivities(result);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          // Check if it's a 401 error user is not authenticated
          if (error?.response?.status === 401 || 
              error?.response?.data?.statusCode === 401 ||
              error?.response?.data?.statusCode === "401") {
            signOut();
          }
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);
  
    return { dementiaUserActivities, isLoading };
};
