import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:4000',
  documents: ['src/**/*.vue', 'src/**/*.ts'],
  ignoreNoDocuments: true, // for better experience with the watcher
  generates: {
    './src/gql/': {
      preset: 'client',
      config: {
        useTypeImports: true,
        dedupeOperationSuffix: true,
        pureMagicComment: true,
        vueApolloComposable: true,
      },
    },
    './src/gql/schema.graphql': {
      plugins: ['schema-ast'],
    },
  },
}

export default config
