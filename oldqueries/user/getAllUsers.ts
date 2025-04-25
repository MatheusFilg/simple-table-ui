import { graphql } from '@/gql'

export const queryAllUsers = graphql(`
query getAllUsers($offset: Int, $limit: Int, $orderBy: UserTableOrderBy, $where: UserTableFilters) {
  userTable(offset: $offset, limit: $limit, orderBy: $orderBy, where: $where) {
    id
    firstName
    lastName
    email
  }
}
`)
