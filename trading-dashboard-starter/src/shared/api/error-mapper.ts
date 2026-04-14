export interface AppError {
  code: string;
  message: string;
  status?: number;
}

export function mapApiError(error: unknown): AppError {
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return {
      code: 'UNKNOWN_ERROR',
      message: String((error as { message?: unknown }).message ?? 'Unexpected error'),
    };
  }

  return {
    code: 'UNKNOWN_ERROR',
    message: 'Unexpected error',
  };
}
