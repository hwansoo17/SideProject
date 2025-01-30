import { useQuery } from '@tanstack/react-query';
import { fetchMyCardList } from '../../api/myCard';
import { queryKey } from './queryKey';

const useMyCardList = () => {
  return useQuery({
    queryKey: queryKey.myCardList,
    queryFn: fetchMyCardList,
  });
};

export default useMyCardList;