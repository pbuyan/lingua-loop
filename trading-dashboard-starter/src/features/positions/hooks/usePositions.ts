import { useQuery } from '@tanstack/react-query';
import { getPositions, GetPositionsParams } from '@/features/positions/api/getPositions';
import { mapPositionDtoToDomain, mapPositionToRow } from '@/features/positions/api/positions.mapper';
import { queryKeys } from '@/shared/constants/query-keys';

export function usePositions(params: GetPositionsParams) {
  return useQuery({
    queryKey: queryKeys.positions.list(params),
    queryFn: async () => {
      const dto = await getPositions(params);
      return dto.map(mapPositionDtoToDomain).map(mapPositionToRow);
    },
    staleTime: 10_000,
    refetchInterval: 15_000,
  });
}
