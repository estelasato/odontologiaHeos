import cityServices, { CityProps } from "@/services/cityServices"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useMemo } from "react"
import { useFormContext } from "react-hook-form";


export const useAddressForm = () => {
  const addressForm = useFormContext();
  const watchCity = addressForm.watch('idCidade')

  const { data: listCities, refetch } = useQuery({
    queryKey: ['listCities'],
    queryFn: () => cityServices.getAllCities()
  })

  const cityOpt = useMemo(() => {
    const data = listCities?.filter((c: CityProps) => c.ativo)?.map((c: CityProps) => {
      return {value: c.id, label: c.cidade}
    })
    return data
  }, [listCities])

  const { data: city } = useQuery({
    queryKey: ['city', watchCity],
    queryFn: async () => {
      if (watchCity) return cityServices.getCityById(watchCity);
      return [];
    },
  });

  useEffect(() => {
    if (city) {
      addressForm.setValue('uf', city.uf)
      addressForm.setValue('pais', city.pais)
    }
  }, [city])


  return {
    refetch,
    cityOpt,
    addressForm,
  }
}
