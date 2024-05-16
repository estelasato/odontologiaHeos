import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";

import countryServices from "@/services/countryServices";
import { modalRefProps } from "@/components/Modal";

export default function useCountry(
  modalRemoveRef?: React.RefObject<modalRefProps>
) {

  const { data: countryList, refetch } = useQuery({
    queryKey: ["countryList"],
    queryFn: () => {
      return countryServices.getAllCountries();
    },
  });

  const { mutateAsync: deleteCountry } = useMutation({
    mutationFn: (id: number) => countryServices.deleteCountry(id),
  })

  const handleRemove = async(id: number) => {
    try {
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
