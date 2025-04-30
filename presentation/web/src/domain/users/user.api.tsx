import { api } from '../common/axios';
import { AuthModel, SignupRequest } from './user.types';

export const userApi = {
  login: async (email: string, password: string) =>
    await api.post<AuthModel>(`/users/login`, {
      email,
      password,
    }),

  signup: async (request: SignupRequest) =>
    await api.post<AuthModel>('/users/signup', request),
};