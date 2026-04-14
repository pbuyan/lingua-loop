import type { CurrentUser } from '@/features/auth/model/auth.types';

export async function getCurrentUser(): Promise<CurrentUser> {
  return {
    id: 'u-001',
    displayName: 'Trader Demo',
    entitlements: ['view:positions', 'view:orders', 'view:risk'],
  };
}
