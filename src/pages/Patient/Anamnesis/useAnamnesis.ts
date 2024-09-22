import { RefObject, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";

import { modalRefProps } from "@/components/Modal";
import anamnesisService, { AnamnesisProps } from "@/services/anamnesisService";
import { useParams } from "react-router-dom";
import treatmentsServices from "@/services/treatmentsServices";
import { Treatmentsype } from "@/validators/treatmentsValidator";
import { FilterList } from "@/utils/shared/FilterList";

export const useAnamnesis = (modalRemoveRef?: RefObject<modalRefProps>, onClickRow?: (data: any) => void) => {
  const [selectedAnamnesis, setSelectedAnamnesis] = useState<AnamnesisProps>();
  const [anamnesis, setAnamnesis] = useState<AnamnesisProps[]>([]);
  const [message, setMessage] = useState<string>("");
  const { id } = useParams();

  const { data: anamnesisList, refetch } = useQuery({
    queryKey: ["anamnesisList"],
    queryFn: () => id && anamnesisService.getAll({ idPaciente: Number(id) }),
  });

  const { data: treatments } = useQuery({
    queryKey: ["treatments", id],
    queryFn: () => id && treatmentsServices.getAll({ idPaciente: Number(id) }),
  });

  const { mutateAsync: deleteAnamnesis } = useMutation({
    mutationFn: (id: number) => anamnesisService.delete(id),
  });

  function hasTreatments(idAnamnese: number) {
    let list: Treatmentsype[] = [];
    treatments?.map((t: Treatmentsype) => {
      t.idAnamnese == idAnamnese && list.push(t);
    });
    if (list.length == 1) setMessage("Esta anamnese está associada ao tratamento de código " + list[0].id);
    if (list.length > 1) setMessage("Esta anamnese está associada aos tratamentos: " + list.map((t) => t.id).join(", "));
    return list;
  }

  const handleRemove = async (id: number) => {
    try {
      await deleteAnamnesis(id);
      modalRemoveRef?.current?.close();
      toast.success("Removido com sucesso");
      refetch();
    } catch (e) {
      toast.error("Ocorreu um erro");
    }
  };

  const handleClickRow = (data?: any) => {
    selectedAnamnesis?.id === data.id
      ? setSelectedAnamnesis(undefined)
      : setSelectedAnamnesis(data);
  };

  useEffect(() => {
    onClickRow && onClickRow(selectedAnamnesis);
  }, [selectedAnamnesis]);

  useEffect(() => {
    anamnesisList && setAnamnesis(anamnesisList);
  }, [anamnesisList]);

  const handleSearch = (e: any) => {
    if (e) {
      const filtered = FilterList(anamnesisList as any, e, ["id", "createdAt"]);
      setAnamnesis(filtered || []);
    } else setAnamnesis(anamnesisList);
  };

  return {
    anamnesisList,
    handleRemove,
    refetch,
    handleClickRow,
    hasTreatments,
    handleSearch,
    anamnesis,
    setAnamnesis,
    selectedAnamnesis,
    setSelectedAnamnesis,
    message,
  };
};
