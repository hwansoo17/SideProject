import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCard } from '../../api/card';

const useDeleteCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteCard(id),
    onSuccess: async () => {
      console.log('Card deleted');
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useDeleteCard;