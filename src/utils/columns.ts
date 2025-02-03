import type { ColumnDef } from "@tanstack/vue-table"
import type { User } from "../types/users"
import { h } from "vue"

// const columnHelper = createColumnHelper<User>()

export const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'id',
      header: 'Id',
      enableColumnFilter: false,
      size:50,
    },
    {
      accessorKey: 'first_name',
      meta: { align: 'center' },
      header: () => h('div', {class: 'text-start'}, 'First Name'),
      cell: ({ row }) => h('div', { class: 'text-start' }, h('span', {}, row.getValue('first_name'))),
      size: 150
    },
    // columnHelper.accessor('first_name', {
    //   id: 'first_name',
    //   header: 'First Name',
    // }),
    {
      accessorKey: 'last_name',
      id: 'last_name',
      size: 150
    },
    {
      accessorKey: 'email',
      id: 'email',
      size: 150
    },
  ]