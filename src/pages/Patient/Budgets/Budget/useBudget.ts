import anamnesisService from "@/services/anamnesisService"
import paymentTermService from "@/services/paymentTermService"
import professionalService from "@/services/professionalService"
import { BudgetSchema, BudgetType } from "@/validators/budgetValidator"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { useParams } from "react-router-dom"

export const useBudget = () => {
  const {id} = useParams();
  const formBudgets = useForm<BudgetType>({
    resolver: zodResolver(BudgetSchema)
  })

  const { data: anamnesisOpt} = useQuery({
    queryKey: ['anamnesisOpt', id],
    queryFn: () => anamnesisService.getAll({idPaciente: Number(id)}),
    select: (data) => data.map((a: any) => ({value: a.id, label: a.id}))
  })

  const { data: professionalOpt} = useQuery({
    queryKey: ['professionalOpt', id],
    queryFn: () => professionalService.getAll(),
    select: (data) => data.map((a: any) => ({value: a.id, label: a.nome}))
  })

  const { data: paymentTermOpt} = useQuery({
    queryKey: ['paymentTermOpt', id],
    queryFn: () => paymentTermService.getAll(),
    select: (data) => data.map((a: any) => ({value: a.id, label: a.id}))
  })

  const onSubmit = async (data: BudgetType) => {
    console.log(data)
  }
  return {
    formBudgets,
    onSubmit,
    anamnesisOpt,
    paymentTermOpt,
    professionalOpt,
  }
}
