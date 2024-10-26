
export const GenderOpt = [
  { value: "M", label: "Masculino" },
  { value: "F", label: "Feminino" },
  { value: "O", label: "Outro" },
]

export const estadoCivilOpt = [
  { value: "S", label: "Solteiro(a)" },
  { value: "C", label: "Casado(a)" },
  { value: "D", label: "Divorciado(a)" },
  { value: "V", label: "Viúvo(a)" },
  { value: "O", label: "Outro" },
]

export const StatusOpts = [
  { value: "AGENDADO", label: "Agendado" },
  // { value: "CANCELADO", label: "Cancelado" },
  { value: "CONFIRMADO", label: "Confirmado" },
  { value: "EM_ATENDIMENTO", label: "Em atendimento" },
  { value: "REALIZADO", label: "Realizado" },
  { value: "NAO_COMPARECEU", label: "Não compareceu" },
]

export const BudgetStatusOpts = [
  { value: "APROVADO", label: "Aprovado" },
  // { value: "PENDENTE", label: "Pendente" },
  // { value: "REJEITADO", label: "Rejeitado" },
  // { value: "EM_ANDAMENTO", label: "Em andamento" },
  { value: "CONCLUÍDO", label: "Concluído" }, // se todas as parcelas estiverem pagas
  { value: "CANCELADO", label: "Cancelado" },

]

export const createBudgetStatusOpts = [
  { value: "APROVADO", label: "Aprovado" },
  { value: "PENDENTE", label: "Pendente" },
]
