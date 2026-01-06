import { DementiaProfile, api } from "@suleigolden/the-last-spelling-bee-api-client";
import { useState, useEffect } from "react";
import { useSignOut } from "./use-sign-out";
import { useUser } from "./use-user";


export const useDementiaUserProfile = () => {
    const { user } = useUser();
    const signOut = useSignOut();
    const [dementiaUserProfile, setDementiaUserProfile] = useState<DementiaProfile>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
  
    useEffect(() => {
      const fetchDementiaUserProfile = async () => {
        // Don't fetch if user is not available
        if (!user?.id) {
          setIsLoading(false);
          return;
        }

        setIsLoading(true);
        try {
       
          const result = await api.service("dementiaProfiles").findByUserId(user.id);
          console.log("dementiaUserProfile hook", result);
          console.log("dementiaUserProfile hook", isLoading);
          setDementiaUserProfile(result);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          // Handle 404 - profile doesn't exist yet (this is OK)
          if (error?.response?.status === 404 || 
              error?.response?.data?.statusCode === 404) {
            setDementiaUserProfile(undefined);
            return;
          }
          
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
  
      fetchDementiaUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);
  
    return { dementiaUserProfile, isLoading };
};
