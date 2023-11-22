export function debounce<F extends (...args: any[]) => any>(
  func: F,
  timeout = 300
): (...args: Parameters<F>) => Promise<ReturnType<F>> {
  let timer: number
  let resolves: ((value: ReturnType<F> | PromiseLike<ReturnType<F>>) => void)[] = []

  return (...args: Parameters<F>) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      // @ts-expect-error(2683)
      const result = func.apply<unknown, Parameters<F>, ReturnType<F>>(this, args)
      resolves.forEach((r) => r(result))
      resolves = []
    }, timeout)

    return new Promise((r) => resolves.push(r))
  }
}
