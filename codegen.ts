import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:8000/graphql',
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
      // Arquivo de schema gerado
      plugins: ['schema-ast'], // Plugin para gerar schema.graphql
      config: {
        includeDirectives: true, // Inclui diretivas se necessário
      },
    },
  },
}

export default config
