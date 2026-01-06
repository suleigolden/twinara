import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../redux-action/store";
import { api } from "../api.service";
import { User } from "~/types/user-types";
import { clearStorage } from "~/common/utils/helperFuntions";
import { GoogleAuth } from "~/types/google-auth.types";

type AuthState = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  credits: number;
};

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  credits: 0,
};

export const signUpUser = createAsyncThunk(
  "auth/signUp",
  async (data: User, { rejectWithValue }) => {
    try {
      const response = await api.service("users").create(data);
      return response;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed",
      );
    }
  },
);

export const authenticate = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.service("auth/login").create(credentials);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    try {
      dispatch(clearAuth());
      clearStorage();
      return { success: true };
    } catch (error: any) {
      throw error;
    }
  }
);

export const authenticateWithGoogle = createAsyncThunk(
  "auth/googleAuth",
  async (googleData: GoogleAuth, { rejectWithValue }) => {
    try {
      const response = await api.service("users/google-auth").create(googleData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Google auth failed");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.credits = action.payload?.credit ?? 0;
      state.isAuthenticated = !!action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    clearAuth: (state) => {
      return initialState;
    },
    updateUserCredits: (state, action: PayloadAction<number>) => {
      state.credits = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, { payload }) => {
        if (payload) {
          state.user = payload as User;
        }
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(authenticate.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(authenticate.fulfilled, (state, { payload }) => {
        if (payload) {
          state.user = payload as User;
        }
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        return initialState;
      })
      .addCase(authenticateWithGoogle.fulfilled, (state, { payload }) => {
        if (payload) {
          state.user = payload as User;
        }
      });
  },
});

export const { setUser, 
  setToken, 
  clearAuth, 
  updateUserCredits,  } =
  authSlice.actions;
export const selectUser = ({ auth }: RootState) => auth?.user;
export const selectCredits = ({ auth }: RootState) => auth?.credits;
export default authSlice.reducer;
