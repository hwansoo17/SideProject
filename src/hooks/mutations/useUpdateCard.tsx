import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCard, ICreateCardInput } from '../../api/card';

const useUpdateCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ICreateCardInput }) => updateCard(id, data),
    onSuccess: async (response) => {
      console.log(response)
      queryClient.invalidateQueries({ queryKey: ['cardList'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useUpdateCard;