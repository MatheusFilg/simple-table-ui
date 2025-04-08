import { graphql } from '@/gql'

export const queryAllEmail = graphql(`
    query getAllEmails($offset: Int, $limit: Int, $orderBy: UserTableOrderBy, $where: UserTableFilters) {
      userTable(offset: $offset, limit: $limit, orderBy: $orderBy, where: $where) {
        email
      }
    }
`)
