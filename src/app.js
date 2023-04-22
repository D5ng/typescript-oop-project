var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.push(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.push(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var _this = this;
function Autobind(_target, _methodName, descriptor) {
    var originalMethod = descriptor.value;
    return {
        get: function () {
            return originalMethod.bind(this);
        },
    };
}
var ProjectInput = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _submitHandler_decorators;
    return _a = /** @class */ (function () {
            function ProjectInput() {
                this.templateElement = (__runInitializers(this, _instanceExtraInitializers), void 0);
                this.templateElement = document.getElementById("project-input");
                this.hostElement = document.getElementById("app");
                var importedNode = document.importNode(this.templateElement.content, true);
                this.element = importedNode.firstElementChild;
                this.element.id = "user-input";
                console.log(this.element);
                this.titleInputElement = this.element.querySelector("#title");
                this.descriptionInputElement = this.element.querySelector("#description");
                this.peopleInputElement = this.element.querySelector("#people");
                this.configure();
                this.attach();
            }
            ProjectInput.prototype.submitHandler = function (event) {
                event.preventDefault();
            };
            ProjectInput.prototype.configure = function () {
                this.element.addEventListener("submit", this.submitHandler);
            };
            ProjectInput.prototype.attach = function () {
                this.hostElement.insertAdjacentElement("afterbegin", this.element);
            };
            return ProjectInput;
        }()),
        (function () {
            _submitHandler_decorators = [Autobind];
            __esDecorate(_a, null, _submitHandler_decorators, { kind: "method", name: "submitHandler", static: false, private: false, access: { has: function (obj) { return "submitHandler" in obj; }, get: function (obj) { return obj.submitHandler; } } }, null, _instanceExtraInitializers);
        })(),
        _a;
}();
new ProjectInput();
