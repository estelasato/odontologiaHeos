import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";

import countryServices from "@/services/countryServices";
import { modalRefProps } from "@/components/Modal";
import stateServices from "@/services/stateServices";

export default function useCountry(
  modalRemoveRef?: React.RefObject<modalRefProps>
) {

  const { data: countryList, refetch } = useQuery({
    queryKey: ["countryList"],
    queryFn: () => {
      return countryServices.getAllCountries();
    },
  });
  const { data: stateList } = useQuery({
    queryKey: ["stateList"],
    queryFn: () => {
      return stateServices.getAllStates();
    },
  });

  const { mutateAsync: deleteCountry } = useMutation({
    mutationFn: (id: number) => countryServices.deleteCountry(id),
  })

  const handleRemove = async(id: number) => {
    try {
      const r = stateList?.find((s: any) => s.idPais === id)
      if (r) return toast.error('Existem estados cadastrados para este país')
      await deleteCountry(id)
      modalRemoveRef?.current?.close()
      refetch()
    } catch (e) {
      toast.error('Ocorreu um erro')
    }
  }

  return {
    countryList,
    handleRemove,
    refetch
  }
}
