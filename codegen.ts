import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:4000/graphql',
  /* nao está verificando arquivos .vue, 
  idealmente é para as querys ficarem nessa pasta \/ */
  documents: ['src/graphql/queries/**/*.ts'],
  generates: {
    './src/gql/': {
      preset: 'client-preset',
      config: {
        useTypeImports: true,
        strict: true,
        vueApolloComposable: true,
      },
    },
    './src/gql/schema.gql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true,
      },
    },
  },
}

export default config
