import { logoutUser } from "~/redux-action/slices/auth-slice";
import { AppDispatch } from "~/redux-action/store";
import { useDispatch } from "react-redux";


export const useSignOut = () => {
    const dispatch = useDispatch<AppDispatch>();
    return async () => {
      await dispatch(logoutUser());
      // Use window.location.href to force a full page reload
      // This ensures the landing page loads properly after logout
      window.location.href = "/";
    };
  };
  