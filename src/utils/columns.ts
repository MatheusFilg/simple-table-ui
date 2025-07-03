import type { User } from '../types/users'
import type { ColumnDef } from '@tanstack/vue-table'
import dayjs from 'dayjs'
import ptBR from 'dayjs/locale/pt-br'
import { h } from 'vue'

dayjs.locale(ptBR)

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'firstName',
    header: () => h('div', { class: 'text-start' }, 'First Name'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-start text-ellipsis overflow-hidden' },
        h('span', {}, row.getValue('firstName'))
      ),
    enableColumnFilter: true,
  },
  {
    accessorKey: 'lastName',
    header: () => h('div', { class: 'text-start' }, 'Last Name'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-start text-ellipsis overflow-hidden w-full' },
        h('span', {}, row.getValue('lastName'))
      ),
  },
  {
    accessorKey: 'profession',
    header: () => h('div', { class: 'text-start' }, 'Profession'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-start text-ellipsis overflow-hidden' },
        h('span', {}, row.getValue('profession'))
      ),
  },
  {
    accessorKey: 'contact',
    header: () => h('div', { class: 'text-start' }, 'Contact'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-start text-ellipsis overflow-hidden' },
        h('span', {}, row.getValue('contact'))
      ),
  },
  {
    accessorKey: 'email',
    header: () => h('div', { class: 'text-start' }, 'Email'),
    cell: ({ row }) =>
      h(
        'div',
        { class: 'text-start text-ellipsis overflow-hidden' },
        h('span', {}, row.getValue('email'))
      ),
  },
]
