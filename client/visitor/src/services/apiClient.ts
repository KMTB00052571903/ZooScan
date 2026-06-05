import axios from 'axios';
import { supabase } from './supabase';

const apiClient = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

// Inject the Supabase session access_token on every request.
apiClient.interceptors.request.use(async (config) => {
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
