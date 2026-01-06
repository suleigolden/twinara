import axios, { AxiosInstance } from 'axios';
import { useUser } from '../hooks/use-user';
import { setupAuthInterceptor } from './axios-interceptor';

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
    };
  }

  // Course Progress specific methods
  courseProgress(userId: string, courseId: string = '468ad5a2-bac9-4b5d-a6cc-281ae1298114') {
    return {
      // Get or create progress for user and course
      getOrCreate: async () => {
        const response = await this.api.get(`/course-progress/user/${userId}/course/${courseId}`);
        return response.data;
      },
      // Update progress for user and course
      update: async (data: any) => {
        const response = await this.api.patch(`/course-progress/user/${userId}/course/${courseId}`, data);
        return response.data;
      },
      // Mark a lesson as completed
      markLessonCompleted: async (lessonId: string) => {
        const response = await this.api.post(`/course-progress/user/${userId}/course/${courseId}/lesson/${lessonId}`, {});
        return response.data;
      },
      // Get all progress for a user
      getAllByUser: async () => {
        const response = await this.api.get(`/course-progress/user/${userId}`);
        return response.data;
      },
      // Get completion stats for a course
      getStats: async () => {
        const response = await this.api.get(`/course-progress/stats/course/${courseId}`);
        return response.data;
      },
    };
  }
}

export const api = new ApiService(); 


export const useApiService = () => {
    const { token } = useUser();
    return new ApiService(token);
};
