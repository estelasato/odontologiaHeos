import accReceivableService from "@/services/accReceivableService"
import { useQuery } from "@tanstack/react-query"

export const useAccReceivable = () => {

  const {data: accReceivableList, refetch} = useQuery({
    queryKey: ['accReceivableList'],
    queryFn: () => accReceivableService.getAll()
  })

  return {
    accReceivableList,
    refetch
  }
}
