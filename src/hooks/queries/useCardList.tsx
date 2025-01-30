import { useQuery } from '@tanstack/react-query';
import { fetchCardList } from '../../api/card';
import { queryKey } from './queryKey';

const useCardList = (isName: boolean) => {
  return useQuery({
    queryKey: queryKey.cardList,
    queryFn: fetchCardList,
    select: (data) => {
          // 정렬 로직 적용
          return [...data].sort((a, b) =>
            isName
              ? a.name.localeCompare(b.name) // 이름 순 정렬
              : a.corporation.localeCompare(b.corporation) // 회사명 순 정렬
          );
        }
    
  });
};

export default useCardList;