import { graphql } from '@/gql'

export const queryAllData = graphql(`
    query queryAllData($offset: Int, $limit: Int, $orderBy: OrderByInput, $where: JSON = null ) {
     dados(offset: $offset, limit: $limit, orderBy: $orderBy, where: $where) 
    }
`)
