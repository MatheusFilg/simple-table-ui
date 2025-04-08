import { graphql } from '@/gql'

export const queryAllLastName = graphql(`
    query getAllLastName($offset: Int, $limit: Int, $orderBy: UserTableOrderBy, $where: UserTableFilters) {
      userTable(offset: $offset, limit: $limit, orderBy: $orderBy, where: $where) {
        lastName
      }
    }
`)
