import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import type { User } from '../types/users'
import DialogTeste from '@/components/ComponenteDialog.vue'

// const columnHelper = createColumnHelper<User>()

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: () => h('div', { class: 'text-start' }, 'Id'),
    cell: ({ row }) =>
      h('div', { class: 'text-start' }, h('span', {}, row.getValue('id'))),
    enableColumnFilter: false,
    enableSorting: false,
    size: 64,
  },
  {
    accessorKey: 'first_name',
    header: () => h('div', { class: 'text-start' }, 'First Name'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-start' },
        h('span', {}, row.getValue('first_name'))
      ),
    size: 164,
  },
  {
    accessorKey: 'last_name',
    header: () => h('div', { class: 'text-start' }, 'Last Name'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-start' },
        h('span', {}, row.getValue('last_name'))
      ),
    size: 164,
  },
  {
    accessorKey: 'email',
    header: () => h('div', { class: 'text-start' }, 'Email'),
    cell: ({ row }) =>
      h('div', { class: 'text-start' }, h('span', {}, row.getValue('email'))),
    size: 304,
  },
  {
    accessorKey: 'modal',
    header: () => h('div', { class: 'text-start' }, 'Modal'),
    cell: () => h('div', { class: 'text-start' }, h(DialogTeste)),
    size: 80,
    enableColumnFilter: false,
    enableSorting: false,
  },
]
