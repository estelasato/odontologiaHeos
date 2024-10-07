import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { modalRefProps } from "..";
import { zodResolver } from "@hookform/resolvers/zod";
import countryServices from "@/services/countryServices";
import useCountry from "@/pages/Registrations/Country/useCountry";
import { CountryForm, countrySchema } from "@/validators/locationValidator";
import { handleExist } from "@/utils/shared/FilterList";

export const options = [
  { label: "Sim", value: 1 },
  { label: "Não", value: 0 },
];

export const useModalCountry = (
  isCreate = false,
  modalRef: React.RefObject<modalRefProps>
) => {
  const countryForm = useForm<CountryForm>({
    resolver: zodResolver(countrySchema),
  });

  const { refetch } = useCountry();

  const { mutateAsync: createCountry } = useMutation({
    mutationKey: ["createCountry"],
    mutationFn: async (data: any) => {
      return countryServices.createCountry(data);
    },
  });

  const { mutateAsync: updateCountry } = useMutation({
    mutationKey: ["updateCountry"],
    mutationFn: async (params: any) => {
      return countryServices.updateCountry(params.id, params);
    },
  });

  const queryClient = useQueryClient();

  const onSubmit = async (data: CountryForm) => {
    try {
      if (isCreate) {
        const listCountry = queryClient.getQueriesData({
          queryKey: ["countryList"],
        });
        const exist = handleExist(
          listCountry[0]?.[1] as any,
          data?.pais,
          "pais"
        );
        if (exist) return toast.error("País já cadastrado");
        await createCountry(data);
      } else {
        await updateCountry(data);
      }
      refetch();
      toast.success("Salvo com sucesso");
      modalRef.current?.close();
    } catch (e) {
      console.log(e);
      toast.error("Ocorreu um erro!");
    }
  };

  return {
    onSubmit,
    countryForm,
  };
};
