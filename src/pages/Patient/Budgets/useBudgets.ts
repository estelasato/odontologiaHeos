import budgetsService from "@/services/budgetsService";
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"


export const useBudgets = () => {
  const {id} = useParams();

  const {data: budgets} = useQuery({
    queryKey: ['budgets', id],
    queryFn: () => budgetsService.getAll({idPaciente: Number(id)}),
  })

  return {
    budgets,
  }
}
