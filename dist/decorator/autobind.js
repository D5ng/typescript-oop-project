"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Autobind = void 0;
// ! 메서드 데코레이터 바인딩
function Autobind(_target, _methodName, descriptor) {
    const originalMethod = descriptor.value;
    return {
        get() {
            return originalMethod.bind(this);
        },
    };
}
exports.Autobind = Autobind;
//# sourceMappingURL=autobind.js.map