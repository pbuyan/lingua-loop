export const queryKeys = {
  positions: {
    all: ['positions'] as const,
    list: (params?: unknown) => ['positions', 'list', params] as const,
    detail: (id: string) => ['positions', 'detail', id] as const,
  },
};
