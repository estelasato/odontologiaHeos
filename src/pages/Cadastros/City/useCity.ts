import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";

import cityServices from "@/services/cityServices";
import { modalRefProps } from "@/components/Modal";

export default function useCity(
  modalRemoveRef?: React.RefObject<modalRefProps>
) {
  const { data: cityList, refetch } = useQuery({
    queryKey: ["cityList"],
    queryFn: () => {
      return cityServices.getAllCities();
    },
  });

  const { mutateAsync: deleteCity } = useMutation({
    mutationFn: (id: number) => cityServices.deleteCity(id),
  });

  const handleRemove = async (id: number) => {
    try {
      await deleteCity(id);
      modalRemoveRef?.current?.close();
      refetch();
    } catch (e) {
      toast.error("Ocorreu um erro");
    }
  };

  return {
    cityList,
    handleRemove,
    refetch,
  };
}
