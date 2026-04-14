import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '@/features/auth/api/getCurrentUser';

export function useCurrentUser() {
  return useQuery({
    queryKey: ['current-user'],
    queryFn: getCurrentUser,
    staleTime: 60_000,
  });
}
