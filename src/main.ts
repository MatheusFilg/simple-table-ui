import { DefaultApolloClient } from '@vue/apollo-composable'
import { createApp } from 'vue'
import '../src/global.css'
import App from './App.vue'
import { apolloClient } from './lib/apollo'

const app = createApp(App)

app.provide(DefaultApolloClient, apolloClient)

app.mount('#app')
