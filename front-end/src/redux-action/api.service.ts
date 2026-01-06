import axios, { AxiosInstance } from 'axios';
import { useUser } from '../hooks/use-user';
import { setupAuthInterceptor } from './axios-interceptor';
import store from './store';

class ApiService {
  private api: AxiosInstance;

  constructor(access_token?: string) {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        ...(access_token ? { Authorization: `Bearer ${access_token}` } : {}),
      },
    });

    // Add request interceptor to automatically add token from Redux store
    if (!access_token) {
      this.api.interceptors.request.use(
        (config) => {
          const state = store.getState();
          const token = (state as any).auth?.token;
          if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
    }

    // Setup the auth interceptor (handles 401 errors)
    setupAuthInterceptor(this.api);
  }
  service(name: string) {
    return {
      create: async (data: any) => {
        const response = await this.api.post(`/${name}`, data);
        return response.data;
      },
      find: async () => {
        const response = await this.api.get(`/${name}`);
        return response.data;
      },
      findOne: async (id: string) => {
        const response = await this.api.get(`/${name}/${id}`);
        return response.data;
      },
      findByUserId: async (userId: string) => {
        const response = await this.api.get(`/${name}/user/${userId}`);
        return response.data;
      },
      update: async (id: string, data: any) => {
        const response = await this.api.patch(`/${name}/${id}`, data);
        return response.data;
      },
      patch: async (id: string, data: any) => {
        const response = await this.api.patch(`/${name}/${id}`, data);
        return response.data;
      },
      delete: async (id: string) => {
        const response = await this.api.delete(`/${name}/${id}`);
        return response.data;
      },
      post: async (endpoint: string, data: any) => {
        const response = await this.api.post(`/${name}/${endpoint}`, data);
        return response.data;
      },
      get: async (endpoint: string) => {
        const response = await this.api.get(`/${name}/${endpoint}`);
        return response.data;
      },
      signOut: async () => {
        const response = await this.api.post(`/${name}/logout`);
        return response.data;
      },
      // Memory AI Agent specific methods
      chat: async (data: { userId: string; message: string }) => {
        const response = await this.api.post(`/${name}/chat`, data);
        return response.data;
      },
      // Twinara Activity Game specific methods
      generateQuestions: async (data: any) => {
        const response = await this.api.post(`/${name}/generate-questions`, data);
        return response.data;
      },
      createTwinaraActivityGame: async (data: any) => {
        const response = await this.api.post(`/${name}`, data);
        return response.data;
      },
      // Dementia User Activities specific methods
      createDementiaUserActivity: async (data: any) => {
        const response = await this.api.post(`/${name}`, data);
        return response.data;
      },
      // Dementia Profiles specific methods
      createDementiaProfile: async (data: any) => {
        const response = await this.api.post(`/${name}`, data);
        return response.data;
      },
      updateDementiaProfile: async (id: string, data: any) => {
        const response = await this.api.patch(`/${name}/${id}`, data);
        return response.data;
      },
    };
  }


}

export const api = new ApiService(); 


export const useApiService = () => {
    const { token } = useUser();
    return new ApiService(token as string);
};
