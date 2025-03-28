import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:4000',
  documents: ['src/graphql/queries/**/*.ts', 'src/**/*.vue'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/gql/': {
      preset: 'client-preset',
      config: {
        useTypeImports: true,
        strict: true,
        vueApolloComposable: true,
      },
    },
  },
}

export default config
