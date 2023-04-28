// ! 메서드 데코레이터 바인딩
export function Autobind(_target, _methodName, descriptor) {
    const originalMethod = descriptor.value;
    return {
        get() {
            return originalMethod.bind(this);
        },
    };
}
//# sourceMappingURL=autobind.js.map