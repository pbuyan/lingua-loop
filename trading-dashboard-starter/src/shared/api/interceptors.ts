import { http } from '@/shared/api/http';

http.interceptors.request.use((config) => {
  return config;
});

http.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
