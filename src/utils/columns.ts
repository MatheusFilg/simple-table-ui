import DialogTeste from '@/components/ComponenteDialog.vue'
import type { ColumnDef } from '@tanstack/vue-table'
import { h } from 'vue'
import type { User } from '../types/users'

// const columnHelper = createColumnHelper<User>()

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'id',
    header: () => h('div', { class: 'text-start' }, 'Id'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-start text-ellipsis overflow-hidden' },
        h('span', {}, row.getValue('id'))
      ),
    enableColumnFilter: false,
    enableSorting: false,
    size: 48,
  },
  {
    accessorKey: 'firstName',
    header: () => h('div', { class: 'text-start' }, 'First Name'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-start' },
        h('span', {}, row.getValue('firstName'))
      ),
    size: 160,
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue?.length) return true
      return filterValue.includes(row.getValue(columnId))
    },
  },
  {
    accessorKey: 'lastName',
    header: () => h('div', { class: 'text-start' }, 'Last Name'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-start' },
        h('span', {}, row.getValue('lastName'))
      ),
    size: 160,
  },
  {
    accessorKey: 'email',
    header: () => h('div', { class: 'text-start' }, 'Email'),
    cell: ({ row }) =>
      h('div', { class: 'text-start' }, h('span', {}, row.getValue('email'))),
    size: 192,
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
