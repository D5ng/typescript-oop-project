// ! 메서드 데코레이터 바인딩
export function Autobind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value
  return {
    get() {
      return originalMethod.bind(this)
    },
  }
}
