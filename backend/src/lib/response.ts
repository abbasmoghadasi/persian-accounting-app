export function success<T>(data: T) {
  return { success: true as const, data }
}

export function failure(message: string, code?: string) {
  return { success: false as const, error: { message, code } }
}
