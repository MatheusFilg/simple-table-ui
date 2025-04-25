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
    size: 32,
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
    size: 32,
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
    size: 32,
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
    size: 32,
  },
  {
    accessorKey: 'nm_cliente',
    header: () => h('div', { class: 'text-start' }, 'Cliente'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-start text-ellipsis overflow-hidden' },
        h('span', {}, row.getValue('nm_cliente'))
      ),
    size: 160,
  },

  {
    accessorKey: 'cd_cnpj',
    header: () => h('div', { class: 'text-start' }, 'CNPJ'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-start text-ellipsis overflow-hidden' },
        h('span', {}, row.getValue('cd_cnpj'))
      ),
    size: 160,
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
    size: 160,
  },
  {
    accessorKey: 'sn_cooperativa',
    header: () => h('div', { class: 'text-start' }, 'Cooperativa'),
    cell: ({ row }) =>
      h(
        'div',
        {
          class: 'justify-center text-ellipsis overflow-hidden w-full flex',
        },
        h(row.getValue('sn_cooperativa') === 'N' ? CircleX : CircleCheck, {
          class: 'w-5 h-5',
        })
      ),
    size: 16,
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
    size: 64,
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
    size: 32,
  },
  {
    accessorKey: 'vl_bruto',
    header: () => h('div', { class: 'text-start' }, 'Vl. Bruto'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-start text-ellipsis overflow-hidden' },
        h('span', {}, row.getValue('vl_bruto'))
      ),
    size: 64,
  },
  {
    accessorKey: 'vl_impostos',
    header: () => h('div', { class: 'text-start' }, 'Vl. Impostos'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-start text-ellipsis overflow-hidden' },
        h('span', {}, row.getValue('vl_impostos'))
      ),
    size: 64,
  },
  {
    accessorKey: 'vl_liquido',
    header: () => h('div', { class: 'text-start' }, 'Vl. Liquido'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-start text-ellipsis overflow-hidden' },
        h('span', {}, row.getValue('vl_liquido'))
      ),
    size: 64,
  },
  {
    accessorKey: 'vl_recebido',
    header: () => h('div', { class: 'text-start' }, 'Vl. Recebido'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-start text-ellipsis overflow-hidden' },
        h('span', {}, row.getValue('vl_recebido'))
      ),
    size: 64,
  },

  // {
  //   accessorKey: 'id',
  //   header: () => h('div', { class: 'text-start' }, 'Id'),
  //   cell: ({ row }) =>
  //     h(
  //       'div',
  //       { class: 'text-start text-ellipsis overflow-hidden' },
  //       h('span', {}, row.getValue('id'))
  //     ),
  //   enableColumnFilter: false,
  //   enableSorting: false,
  //   size: 48,
  // },
  // {
  //   accessorKey: 'firstName',
  //   header: () => h('div', { class: 'text-start' }, 'First Name'),
  //   cell: ({ row }) =>
  //     h(
  //       'div',
  //       { class: 'text-start' },
  //       h('span', {}, row.getValue('firstName'))
  //     ),
  //   size: 160,
  //   filterFn: (row, columnId, filterValue) => {
  //     if (!filterValue?.length) return true
  //     return filterValue.includes(row.getValue(columnId))
  //   },
  // },
  // {
  //   accessorKey: 'lastName',
  //   header: () => h('div', { class: 'text-start' }, 'Last Name'),
  //   cell: ({ row }) =>
  //     h(
  //       'div',
  //       { class: 'text-start' },
  //       h('span', {}, row.getValue('lastName'))
  //     ),
  //   size: 160,
  // },
  // {
  //   accessorKey: 'email',
  //   header: () => h('div', { class: 'text-start' }, 'Email'),
  //   cell: ({ row }) =>
  //     h('div', { class: 'text-start' }, h('span', {}, row.getValue('email'))),
  //   size: 192,
  // },
  // {
  //   accessorKey: 'modal',
  //   header: () => h('div', { class: 'text-start' }, 'Modal'),
  //   cell: () => h('div', { class: 'text-start' }, h(DialogTeste)),
  //   size: 80,
  //   enableColumnFilter: false,
  //   enableSorting: false,
  // },
]
