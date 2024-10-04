import basicServices, { BasicProps } from "@/services/basicServices";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";


export const useIncludeAllergies = (listData?: any[]) => {
  const [list, setList] = useState<any[]>(listData || []);

  const form = useFormContext();
  const { setValue } = form;

  useEffect(() => {
    listData && setList(listData);
  }, [listData]);

  const handleRemove = (index: number) => {
    const newList = [...list];
    newList.splice(index, 1);
    setList(newList);
    setValue('alergias', newList);
  };

  const {data: allergyOptions} = useQuery({
    queryKey: ['allergyOptions'],
    queryFn: async () => {
      return await basicServices.getAll('allergy')
    },
    select: (data) => {
      const options = data?.filter((a: BasicProps) => a.ativo)?.map((i: BasicProps) => (
        {value: i.id, label: i.nome}
      ))
      return options
    }
  })

  return {
    allergyOptions,
    handleRemove,
    list,
    setList,
  }

}
