import { ApolloClient, InMemoryCache } from '@apollo/client/core'

export const apolloClient = new ApolloClient({
  uri: import.meta.env.VITE_SIMPLE_TABLE_API,
  cache: new InMemoryCache(),
})
