import { useCurrentUser } from '@/features/auth/hooks/useCurrentUser';

export function usePermissions() {
  const { data } = useCurrentUser();

  const hasPermission = (permission: string) => data?.entitlements.includes(permission) ?? false;

  return { hasPermission };
}
