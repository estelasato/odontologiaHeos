import { BudgetSchema, BudgetTreatmType } from "@/validators/budgetValidator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export const useModalBudgets = (modalRef: React.RefObject<any>) => {
  const formBudgets = useForm<BudgetTreatmType>({
    resolver: zodResolver(BudgetSchema)
  })

  const onSubmit = async (data: BudgetTreatmType) => {
    console.log(data)
  }
  return {
    formBudgets,
    onSubmit,
  }
}
