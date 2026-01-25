import { useQuery } from '@tanstack/react-query';
import { activitiesApi } from '@/services/api';
import type { Activity } from '@/types';

export function useActivities(params?: Record<string, string>) {
  return useQuery<Activity[]>({
    queryKey: ['activities', params],
    queryFn: async () => {
      const res = await activitiesApi.getAll(params);
      return res.data;
    },
    staleTime: 10 * 60 * 1000,
  });
}

export function useActivity(id: string) {
  return useQuery<Activity>({
    queryKey: ['activity', id],
    queryFn: async () => {
      const res = await activitiesApi.getById(id);
      return res.data;
    },
    enabled: !!id,
  });
}
