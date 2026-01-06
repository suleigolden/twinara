import { DementiaUserActivity, api } from "@suleigolden/the-last-spelling-bee-api-client";
import { useState, useEffect } from "react";
import { useSignOut } from "./use-sign-out";
import { useUser } from "./use-user";


export const useDementiaUserActivities = () => {
    const { user } = useUser();
    const signOut = useSignOut();
    const [dementiaUserActivities, setDementiaUserActivities] = useState<DementiaUserActivity[]>();
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      const fetchUserProfile = async () => {
        setIsLoading(true);
        try {
          const result = await api.service("dementiaUserActivities").findByUserId(user?.id as string);
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
