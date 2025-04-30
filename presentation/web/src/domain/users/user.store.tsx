import jwtDecode from 'jwt-decode';
import { StateSlice, useAppStore } from '../app.store';
import { userApi } from './user.api';
import { SignupRequest, UserModel } from './user.types';

export type UserState = {
  user: UserModel | undefined;
  isUserLoggedIn: boolean;
  accessToken?: string;
  loginError?: string;
  signUpError?: string;
  isResendEmailVerificationSent?: boolean;
  theme: 'light' | 'dark';
  userActions: {
    login: (email: string, password: string) => Promise<void>;
    signup: (request: SignupRequest) => Promise<void>;
    logout: () => void;
    isSessionExpired: () => boolean;
    setTheme: (theme: 'light' | 'dark') => void;
  };
};

export const createUserStore: StateSlice<UserState> = (set, get) => ({
  user: undefined,
  isUserLoggedIn: false,
  accessToken: undefined,
  loginError: undefined,
  signUpError: undefined,
  theme: 'light',
  userActions: {
    login: async (email: string, password: string) => {
      const { data, error } = await userApi.login(email, password);

      if (error) {
        set({
          loginError: error,
        });
        return;
      }

      set({
        user: { ...jwtDecode<UserModel>(data.accessToken) },
        accessToken: data.accessToken,
        isUserLoggedIn: true,
        loginError: '',
      });
    },
    signup: async (request: SignupRequest) => {
      const { error } = await userApi.signup(request);

      if (error) {
        set({
          signUpError: error || 'Something went wrong',
        });
        return;
      }

      set({
        signUpError: '',
      });
    },
    logout: () => {
      set({ user: undefined, isUserLoggedIn: false, accessToken: undefined });
    },
    isSessionExpired: () => {
      const user = get().user;

      if (!user) {
        return true;
      }

      const currentTime = Math.floor(Date.now() / 1000); /// Current time in seconds
      const timeLeft = user.exp - currentTime; // Time left in seconds
      return timeLeft > 0 ? false : true; // Return 0 if expired
    },
    setTheme: (theme: 'light' | 'dark') => {
      set({ theme });
    }
  },
});

export const useUserActions = () => useAppStore((state) => state.userActions);