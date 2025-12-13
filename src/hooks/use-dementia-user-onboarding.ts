import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { api, CreateDementiaProfileRequest } from '@suleigolden/the-last-spelling-bee-api-client';
import { CustomToast } from './CustomToast';
import { useEffect, useState } from 'react';
import { DementiaUserOnboardingSchema, DementiaUserOnboardingSchemaType } from '~/apps/dementia-user-onboard/schema';
import { useUser } from './use-user';
import { useStepsNotCompleted } from './use-steps-not-completed';

export const useDementiaUserOnboarding = (isLastStep?: boolean) => {
  const showToast = CustomToast();
  const { user } = useUser();
  const { stepsNotCompleted, isLoading } = useStepsNotCompleted();
  const dementiaUserProfile = stepsNotCompleted?.dementiaUserProfile;
  const [avatarUrl, setAvatarUrl] = useState<string>(
    dementiaUserProfile?.avatarUrl || ''
  );

  const methods = useForm<DementiaUserOnboardingSchemaType>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver<DementiaUserOnboardingSchemaType, any, any>(DementiaUserOnboardingSchema),
  });
  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (dementiaUserProfile) {
      // Format dob from Date to string (YYYY-MM-DD)
      const dobString = dementiaUserProfile.dob 
        ? new Date(dementiaUserProfile.dob).toISOString().split('T')[0]
        : undefined;

      reset({
        nickname: dementiaUserProfile.nickname || undefined,
        firstName: dementiaUserProfile.firstName || undefined,
        lastName: dementiaUserProfile.lastName || undefined,
        dob: dobString,
        gender: dementiaUserProfile.gender || undefined,
        phoneNumber: dementiaUserProfile.phoneNumber || undefined,
        email: dementiaUserProfile.email || undefined,
        addressLine: dementiaUserProfile.addressLine || undefined,
        workHistory: dementiaUserProfile.workHistory || undefined,
        hobbies: dementiaUserProfile.hobbies || undefined,
        importantDates: dementiaUserProfile.importantDates?.map(date => ({
          label: date.label,
          date: typeof date.date === 'string' 
            ? date.date 
            : new Date(date.date).toISOString().split('T')[0],
        })) || undefined,
        notesFromCaregiver: dementiaUserProfile.notesFromCaregiver || undefined,
        bio: dementiaUserProfile.bio || undefined,
        avatar_url: dementiaUserProfile.avatarUrl || undefined,
      });
      setAvatarUrl(dementiaUserProfile.avatarUrl || '');
    }
  }, [reset, dementiaUserProfile]);
  
  const onSubmit = async (data: DementiaUserOnboardingSchemaType) => {
    try {
      // Validate that we have the required user ID
      if (!user?.id) {
        showToast('Error', 'Missing required user information', 'error');
        return;
      }

      // Map schema data to API request format
      const profilePayload: CreateDementiaProfileRequest = {
        nickname: data.nickname || undefined,
        firstName: data.firstName || undefined,
        lastName: data.lastName || undefined,
        dob: data.dob && data.dob.trim() !== '' ? data.dob : undefined,
        gender: data.gender as any,
        phoneNumber: data.phoneNumber || undefined,
        email: data.email || undefined,
        addressLine: data.addressLine || undefined,
        workHistory: data.workHistory?.filter((item): item is string => Boolean(item)) || undefined,
        hobbies: data.hobbies?.filter((item): item is string => Boolean(item)) || undefined,
        importantDates: data.importantDates || undefined,
        notesFromCaregiver: data.notesFromCaregiver || undefined,
        bio: data.bio || undefined,
        avatarUrl: data.avatar_url || undefined,
      };

      if (dementiaUserProfile?.id) {
        // Update existing profile
        await api.service('dementiaProfiles').updateDementiaProfile(
          dementiaUserProfile.id,
          profilePayload
        );
        showToast('Success', 'Profile updated successfully', 'success');
      } else {
        // Create new profile
        await api.service('dementiaProfiles').createDementiaProfile(profilePayload);
        showToast('Success', 'Profile created successfully', 'success');
      }
      
    } catch (error: unknown) {
      const errorMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message || 
        'An unexpected error occurred. Please try again.';
      showToast('Error', errorMessage, 'error');
      throw error;
    }
  };

  return {
    methods,
    handleSubmit: handleSubmit(onSubmit),
    isSubmitting,
    isLoading,
    setValue,
    avatarUrl, 
    setAvatarUrl,
    stepsNotCompleted
  };
};