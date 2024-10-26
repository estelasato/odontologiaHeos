
interface accReceivableList {
  id: number
  nomePaciente: string
  nomeProfissional: string
  idPaciente: number
  idOrcamento: number
  idProfissional: number
  idFormaPag: number
  obs?: string
  parcela?: number
  desconto?: number
  multa?: number
  juros?: number
  valorParcela: number
  valorRecebido?: number
  dtVencimento: Date
  dtCancelamento?: Date
  dtCadastro: Date
  dtUltAlt: Date
  situacao: number
  dtRecebimento?: Date
  idUser?: number
  typeUser?: string
}
