import saleOfServiceService from "@/services/saleOfServiceService"
import { useQuery } from "@tanstack/react-query"

export const useServicesList = () => {
  const { data: servicesList, refetch, isLoading } = useQuery({
    queryKey: ["servicesList"],
    queryFn: () => saleOfServiceService.getAll()
  })


  return {
    servicesList,
    isLoading,
    refetch,
  }
}
