// import DialogTeste from '@/components/DialogSlot.vue'
// import type { User } from '../types/users'
import type { Data } from '@/types/data'
import type { ColumnDef } from '@tanstack/vue-table'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { CircleCheck, CircleX } from 'lucide-vue-next'
import { h } from 'vue'

dayjs.locale(ptBR)

export const columns: ColumnDef<Data>[] = [
  {
    accessorKey: 'cd_empresa',
    header: () => h('div', { class: 'text-start' }, 'Cód. Empresa'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-start text-ellipsis overflow-hidden' },
        h('span', {}, row.getValue('cd_empresa'))
      ),
    enableColumnFilter: true,
  },
  {
    accessorKey: 'nm_empresa',
    header: () => h('div', { class: 'text-start' }, 'Nome Empresa'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-start text-ellipsis overflow-hidden w-full' },
        h('span', {}, row.getValue('nm_empresa'))
      ),
  },
  {
    accessorKey: 'cd_filial',
    header: () => h('div', { class: 'text-start' }, 'Filial'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-start text-ellipsis overflow-hidden' },
        h('span', {}, row.getValue('cd_filial'))
      ),
  },
  {
    accessorKey: 'cd_cliente_benner',
    header: () => h('div', { class: 'text-start' }, 'Cód. Benner'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-start text-ellipsis overflow-hidden' },
        h('span', {}, row.getValue('cd_cliente_benner'))
      ),
  },
  {
    accessorKey: 'cd_cliente_monitor',
    header: () => h('div', { class: 'text-start' }, 'Cód. Monitor'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-start text-ellipsis overflow-hidden' },
        h('span', {}, row.getValue('cd_cliente_monitor'))
      ),
  },
  {
    accessorKey: 'nm_cliente',
    header: () => h('div', { class: 'text-start' }, 'Cliente'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-start text-ellipsis overflow-hidden' },
        h(
          'span',
          { class: 'text-ellipsis overflow-hidden max-w-[300px]' },
          row.getValue('nm_cliente')
        )
      ),
  },

  {
    accessorKey: 'cd_cnpj',
    header: () => h('div', { class: 'text-start' }, 'CNPJ'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-start text-ellipsis overflow-hidden' },
        h(
          'span',
          {
            class: `${row.getValue('cd_cnpj') === null ? 'text-foreground/50' : ''}`,
          },
          row.getValue('cd_cnpj') === null ? 'Vazio' : row.getValue('cd_cnpj')
        )
      ),
  },
  {
    accessorKey: 'tp_cliente',
    header: () => h('div', { class: 'text-start' }, 'Tipo Cliente'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-start text-ellipsis overflow-hidden' },
        h('span', {}, row.getValue('tp_cliente'))
      ),
  },
  {
    accessorKey: 'sn_cooperativa',
    header: () => h('div', { class: 'text-start' }, 'Cooperativa'),
    cell: ({ row }) =>
      h(
        'div',
        {
          class: 'justify-center text-ellipsis overflow-hidden w-full flex',
          style: `color: ${row.getValue('sn_cooperativa') === 'N' ? 'red' : 'green'}`,
        },
        h(row.getValue('sn_cooperativa') === 'N' ? CircleX : CircleCheck, {
          class: 'w-5 h-5',
        })
      ),
  },
  {
    accessorKey: 'dt_status',
    header: () => h('div', { class: 'text-start' }, 'Data Status'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-start text-ellipsis overflow-hidden' },
        h('span', {}, dayjs(row.getValue('dt_status')).format('DD/MM/YYYY'))
      ),
  },
  {
    accessorKey: 'cd_centro_custo',
    header: () => h('div', { class: 'text-start' }, 'Cód. Unidade'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-start text-ellipsis overflow-hidden' },
        h('span', {}, row.getValue('cd_centro_custo'))
      ),
  },
  {
    accessorKey: 'vl_bruto',
    header: () => h('div', { class: 'text-start' }, 'Vl. Bruto (R$)'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-start text-ellipsis overflow-hidden' },
        h(
          'span',
          {
            class: `${row.getValue('vl_bruto') === null ? 'text-foreground/50' : ''}`,
          },
          row.getValue('vl_bruto') === null
            ? 'Sem Valor'
            : row.getValue('vl_bruto')
        )
      ),
  },
  {
    accessorKey: 'vl_impostos',
    header: () => h('div', { class: 'text-start' }, 'Vl. Impostos (R$)'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-start text-ellipsis overflow-hidden' },
        h(
          'span',
          {
            class: `${row.getValue('vl_impostos') === null ? 'text-foreground/50' : ''}`,
          },
          row.getValue('vl_impostos') === null
            ? 'Sem Valor'
            : row.getValue('vl_impostos')
        )
      ),
  },
  {
    accessorKey: 'vl_liquido',
    header: () => h('div', { class: 'text-start' }, 'Vl. Liquido (R$)'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-start text-ellipsis overflow-hidden' },
        h(
          'span',
          {
            class: `${row.getValue('vl_liquido') === null ? 'text-foreground/50' : ''}`,
          },
          row.getValue('vl_liquido') === null
            ? 'Sem Valor'
            : row.getValue('vl_liquido')
        )
      ),
  },
  {
    accessorKey: 'vl_recebido',
    header: () => h('div', { class: 'text-start' }, 'Vl. Recebido (R$)'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-start text-ellipsis overflow-hidden' },
        h(
          'span',
          {
            class: `${row.getValue('vl_recebido') === null ? 'text-foreground/50' : ''}`,
          },
          row.getValue('vl_recebido') === null
            ? 'Sem Valor'
            : row.getValue('vl_recebido')
        )
      ),
  },
]
