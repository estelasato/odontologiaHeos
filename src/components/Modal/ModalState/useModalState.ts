import { useMemo } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import { modalRefProps } from "..";
import stateServices from "@/services/stateServices";
import { CountryProps } from "@/services/countryServices";
import useStateData from "@/pages/Cadastros/State/useState";
import { stateForm, stateSchema } from "@/validators/locationValidator";
import useCountry from "@/pages/Cadastros/Country/useCountry";

export const useModalState = (
  isCreate = false,
  modalRef: React.RefObject<modalRefProps>
) => {
  const stateForm = useForm<stateForm>({
    resolver: zodResolver(stateSchema),
  });

  const { refetch } = useStateData();

  const { mutateAsync: createState } = useMutation({
    mutationKey: ["createState"],
    mutationFn: async (data: any) => {
      return stateServices.createState(data);
    },
  });

  const { mutateAsync: updateState } = useMutation({
    mutationKey: ["updateState"],
    mutationFn: async (params: any) => {
      return stateServices.updateState(params.estado_ID, params);
    },
  });

  const onSubmit = async (data?: stateForm) => {
    try {
      console.log(data, "dd");
      if (isCreate) {
        await createState(data);
      } else {
        await updateState(data);
      }
      refetch();
      toast.success("Salvo com sucesso");
      modalRef.current?.close();
    } catch (e) {
      console.log(e);
      toast.error("Ocorreu um erro!");
    }
  };

  const { countryList } = useCountry();

  const countryOptions = useMemo(() => {
    return countryList?.map((country: CountryProps) => ({
      value: country.pais_ID,
      label: country.pais,
    }));
  }, [countryList]);

  return {
    onSubmit,
    stateForm,
    countryOptions,
  };
};
