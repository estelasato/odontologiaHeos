import budgetsService from "@/services/budgetsService";
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"


export const useBudgets = () => {
  const {idPaciente} = useParams();

  const {data: budgets} = useQuery({
    queryKey: ['budgets', idPaciente],
    queryFn: () => budgetsService.getAll({idPaciente: Number(idPaciente)}),
  })

  return {
    budgets,
  }
}
