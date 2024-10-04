import { useMemo } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

import cityServices from "@/services/cityServices";
import useCity from "@/pages/Registrations/City/useCity";
import useStateData from "@/pages/Registrations/State/useState";
import { StateProps } from "@/services/stateServices";
import { CityForm, citySchema } from "@/validators/locationValidator";
import { modalRefProps } from "..";

export const useModalCity = (
  isCreate = false,
  modalRef: React.RefObject<modalRefProps>
) => {
  const cityForm = useForm<CityForm>({
    resolver: zodResolver(citySchema),
  });

  const { refetch } = useCity();

  const { mutateAsync: createCity } = useMutation({
    mutationKey: ["createCity"],
    mutationFn: async (data: any) => {
      return cityServices.createCity(data);
    },
  });

  const { mutateAsync: updateCity } = useMutation({
    mutationKey: ["updateCity"],
    mutationFn: async (params: any) => {
      return cityServices.updateCity(params.id, params);
    },
  });

  const onSubmit = async (data?: CityForm) => {
    try {
      if (isCreate) {
        await createCity(data);
      } else {
        await updateCity(data);
      }
      refetch();
      toast.success("Salvo com sucesso");
      modalRef.current?.close();
    } catch (e) {
      console.log(e);
      toast.error("Ocorreu um erro!");
    }
  };

  const { stateList } = useStateData();

  const stateOpt = useMemo(() => {
    return stateList.filter((a: StateProps) => a.ativo)?.map((state: StateProps) => ({
      value: state.id,
      label: state.estado,
    }));
  }, [stateList]);

  return {
    onSubmit,
    cityForm,
    stateOpt,
  };
};
