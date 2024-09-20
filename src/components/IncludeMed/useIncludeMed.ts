import basicServices, { BasicProps } from "@/services/basicServices"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";


export const useIncludeMed = (listData?: any[]) => {
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
    setValue('medicamentos', newList);
  };

  const {data: medOptions} = useQuery({
    queryKey: ['medOptions'],
    queryFn: async () => {
      return await basicServices.getAll('medications')
    },
    select: (data) => {
      const options = data?.map((i: BasicProps) => (
        {value: i.id, label: i.nome}
      ))
      return options
    }
  })

  return {
    medOptions,
    handleRemove,
    list,
    setList,
  }
}
