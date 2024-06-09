import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";

import { modalRefProps } from "@/components/Modal";
import stateServices from "../../../services/stateServices";

export default function useStateData(
  modalRemoveRef?: React.RefObject<modalRefProps>
) {
  const { data: stateList, refetch } = useQuery({
    queryKey: ["stateList"],
    queryFn: () => {
      return stateServices.getAllStates();
    },
  });

  const { mutateAsync: deleteState } = useMutation({
    mutationFn: (id: number) => stateServices.deleteState(id),
  });

  const handleRemove = async (id: number) => {
    try {
      await deleteState(id);
      refetch();
      modalRemoveRef?.current?.close();
    } catch (e) {
      toast.error("Ocorreu um erro");
    }
  };

  return {
    stateList,
    handleRemove,
    refetch,
  };
}
