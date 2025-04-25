export interface Data {
  cd_empresa: number
  nm_empresa: string
  cd_filial: number
  nm_filial: string
  cd_cliente_benner: number
  cd_cliente_monitor: number
  nm_cliente: string
  nm_apelido_cliente: string
  cd_cnpj: string
  tp_cliente: string
  sn_cooperativa: string
  nm_grupo_economico: string
  dt_limite_faturamento: string | null
  nm_regiao_comercial: string
  nm_estado: string
  nm_municipio: string
  cd_contrato: string
  ds_status_contrato: string
  dt_status: string
  tp_renovacao_contrato: string
  sn_faturamento_automatico: string
  sn_fat_exige_oc: string
  sn_fat_exige_empenho: string
  cd_centro_custo: number
  nm_centro_custo: string
  cd_estrutura_centro_custo: string
  nm_divisao_centro_custo: string
  dt_inicio_vigencia_contrato: string
  dt_fim_vigencia_contrato: string
  dt_inclusao_contrato: string
  cd_item: number
  cd_produto: number
  nm_item: string
  ds_item: string
  qt_chaves: number
  nm_unidade_license: string | null
  nm_oportunidade_benner: string
  vl_total_item: number
  vl_a_faturar: number
  sn_recorrente: string
  dt_rescisao_item: string
  dt_primeira_parcela: string
  dt_primeira_liberacao: string
  nr_parcelas_restantes: number
  dt_proxima_parcela: string
  nm_projeto: string | null
  ds_status_faturamento: string
  dt_liberacao: string
  vl_liberado: number
  cd_documento: number
  nr_nota: number
  vl_bruto: number
  vl_impostos: number
  vl_liquido: number
  vl_recebido: number
  vl_perda: number
  vl_renegociado: number
  vl_vincendo: number
  vl_vencido: number
  dt_emissao: string
  cd_parcela: number
  dt_vencimento: string
  dt_liquidacao: string
  dt_ultima_liq: string
  ds_status: string
  ds_detalhamento: string | null
  ds_operacao: string | null
  ds_historico: string | null
}
