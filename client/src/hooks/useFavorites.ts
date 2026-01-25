import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { favoritesApi } from '@/services/api';
import type { Favorite } from '@/types';

export function useFavorites() {
  return useQuery<Favorite[]>({
    queryKey: ['favorites'],
    queryFn: async () => {
      const res = await favoritesApi.getAll();
      return res.data;
    },
  });
}

export function useToggleFavorite() {
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (activityId: string) => favoritesApi.add(activityId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['favorites'] }),
  });

  const removeMutation = useMutation({
    mutationFn: (favoriteId: string) => favoritesApi.remove(favoriteId),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['favorites'] }),
  });

  return { addMutation, removeMutation };
}
