import basicServices, { BasicProps } from "@/services/basicServices"
import { useQuery } from "@tanstack/react-query"


export const useIncludeIllness = () => {

  const {data: illnessOptions} = useQuery({
    queryKey: ['illnessOptions'],
    queryFn: async () => {
      return await basicServices.getAll('illness')
    },
    select: (data) => {
      const illness = data?.filter((d: BasicProps) => !!d.ativo)
      const options = illness?.map((i: BasicProps) => (
        {value: i.id, label: i.nome}
      ))
      return options
    }
  })

  return {
    illnessOptions
  }
}
