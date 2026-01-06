import { api } from "~/redux-action/api.service";
import { useState, useEffect } from "react";
import { useSignOut } from "./use-sign-out";
import { useUser } from "./use-user";

// Define the type locally since we're no longer using the external API client
type DementiaProfile = {
    id: string;
    userId: string;
    nickname?: string;
    firstName?: string;
    lastName?: string;
    dob?: string | Date;
    gender?: string;
    phoneNumber?: string;
    email?: string;
    address?: {
        street?: string;
        city?: string;
        state?: string;
        country?: string;
        postal_code?: string;
    };
    workHistory?: string[];
    hobbies?: string[];
    importantDates?: Array<{ label: string; date: string | Date }>;
    notesFromCaregiver?: string;
    bio?: string;
    avatarUrl?: string;
    createdAt?: string | Date;
    updatedAt?: string | Date;
};

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
       
          const result = await api.service("dementia-profiles").findByUserId(user.id);
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
