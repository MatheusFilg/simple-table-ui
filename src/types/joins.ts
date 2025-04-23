export type JoinsConfig = typeof joinsConfig

export const joinsConfig = {
  joinsOperators: [
    { index: 1, label: 'Contains', value: 'ilike' as const },
    { index: 2, label: 'Does not contain', value: 'notLike' as const },
    { index: 3, label: 'Is', value: 'eq' as const },
    { index: 4, label: 'Is not', value: 'ne' as const },
    { index: 5, label: 'Is Empty', value: 'isNull' as const },
    { index: 6, label: 'Is Not Empty', value: 'isNotNull' as const },
  ],
}
