import type { ColumnDef } from '@tanstack/vue-table'
import type { User } from '../types/users'
import { h } from 'vue'

// const columnHelper = createColumnHelper<User>()

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: () => h('div', { class: 'text-start' }, 'Id'),
    cell: ({ row }) =>
      h('div', { class: 'text-start' }, h('span', {}, row.getValue('id'))),
    enableColumnFilter: false,
    size: 32,
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
    size: 120,
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
    size: 120,
  },
  {
    accessorKey: 'email',
    header: () => h('div', { class: 'text-start' }, 'Email'),
    cell: ({ row }) =>
      h('div', { class: 'text-start' }, h('span', {}, row.getValue('email'))),
    size: 240,
  },
]
