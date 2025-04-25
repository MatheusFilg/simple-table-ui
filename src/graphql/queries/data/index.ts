import { graphql } from '@/gql'

export const queryAllData = graphql(`
    query queryAllData($offset: Int, $limit: Int) {
     dados(offset: $offset, limit: $limit) 
    }
`)
