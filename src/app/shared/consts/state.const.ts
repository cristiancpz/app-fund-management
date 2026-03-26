export const TYPE_TRANSACTION = {
  SUBSCRIPTION: 'Suscripción',
  CANCELATION: 'Cancelación'
} as const

export type transactionType = typeof TYPE_TRANSACTION[keyof typeof TYPE_TRANSACTION];
