import { graphql } from '@/gql'

export const queryAllFirstName = graphql(`
    query getAllFirstName($offset: Int, $limit: Int, $orderBy: UserTableOrderBy, $where: UserTableFilters) {
      userTable(offset: $offset, limit: $limit, orderBy: $orderBy, where: $where) {
        firstName
      }
    }
`)
