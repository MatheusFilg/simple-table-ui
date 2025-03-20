import { ApolloClient, InMemoryCache } from '@apollo/client/core'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { createApp } from 'vue'
import '../src/global.css'
import App from './App.vue'

const apolloClient = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})

const app = createApp(App)

app.use(VueQueryPlugin)

app.provide(DefaultApolloClient, apolloClient)

app.mount('#app')
