import { useState } from 'react';
import { CustomToast } from './CustomToast';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from '../redux-action/slices/auth-slice';


export const useLogInNavigation = (type?: 'login' | 'signup') => {
  const dispatch = useDispatch();
  const [isInvalidCredentials, setIsInvalidCredentials] =
    useState<boolean>(false);
  const showToast = CustomToast();


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const navigateToDashboard = async (payload: any) => {
    const user = payload.user;
    const token = payload.accessToken;
    
    if (user) {
      // Store user and token in Redux
      dispatch(setUser(user));
      dispatch(setToken(token));
      
      // Store in localStorage as backup

      setIsInvalidCredentials(false);
      showToast("Login", "Successfully Login", "success");
      
      switch (user.accountType) {
        case 'individual':
          window.location.href = `/user/${user.id}/dashboard`;
          break;
        case 'dementia-user':
          if(type === 'signup'){
            window.location.href = `/user/${user.id}/dementia-user/onboarding`;
          } else {
            window.location.href = `/user/${user.id}/dashboard`;
          }
          break;
        default:
          break;
      }
    } else {
      setIsInvalidCredentials(true);
      showToast("Login", "Invalid Credentials", "error");
    }
  };


  return { navigateToDashboard, isInvalidCredentials, setIsInvalidCredentials };
};
