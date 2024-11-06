import { BudgetSchema, BudgetProcedureType } from "@/validators/budgetValidator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export const useModalBudgets = () => {
  const formBudgets = useForm<BudgetProcedureType>({
    resolver: zodResolver(BudgetSchema)
  })

  const onSubmit = async (data: BudgetProcedureType) => {
    console.log(data)
  }
  return {
    formBudgets,
    onSubmit,
  }
}
