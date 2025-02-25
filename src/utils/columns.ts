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
    enableSorting: false,
    size: 64,
  },
  {
    accessorKey: 'first_name',
    id: 'First Name',
    header: () => h('div', { class: 'text-start' }, 'First Name'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-start' },
        h('span', {}, row.getValue('First Name'))
      ),
    size: 164,
  },
  {
    accessorKey: 'last_name',
    id: 'Last Name',
    header: () => h('div', { class: 'text-start' }, 'Last Name'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-start' },
        h('span', {}, row.getValue('Last Name'))
      ),
    size: 164,
  },
  {
    accessorKey: 'email',
    id: 'Email',
    header: () => h('div', { class: 'text-start' }, 'Email'),
    cell: ({ row }) =>
      h('div', { class: 'text-start' }, h('span', {}, row.getValue('Email'))),
    size: 240,
  },
]
