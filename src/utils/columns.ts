import { createColumnHelper } from "@tanstack/vue-table"
import type { User } from "../types/users"

const columnHelper = createColumnHelper<User>()

export const columns = [
    {
      accessorKey: 'id',
      id: 'id',
      enableColumnFilter: false,
    },
    columnHelper.accessor('first_name', {
      id: 'first_name',
      header: 'First Name',
    }),
    {
      accessorKey: 'last_name',
      id: 'last_name',
    },
    {
      accessorKey: 'email',
      id: 'email',
    },
  ]