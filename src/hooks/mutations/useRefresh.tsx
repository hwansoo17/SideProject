import { useMutation, useQueryClient } from "@tanstack/react-query";
import { refresh } from "../../api/auth";
import useAuthStore from "../../store/useAuthStore";

const useRefresh = () => {
  const queryClient = useQueryClient();
  const {isLoggedIn, setIsLoggedIn} = useAuthStore();
  return useMutation({
    mutationFn: refresh,
    onSuccess: async () => {
      setIsLoggedIn(true);
      console.log("Refreshed");
    },
    onError: (error) => {
      setIsLoggedIn(false);
      console.log(error);
    },
  });
};

export default useRefresh;