"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectItem = void 0;
const base_components_1 = require("./base-components");
const autobind_1 = require("../decorator/autobind");
class ProjectItem extends base_components_1.Component {
    constructor(hostId, project) {
        super("single-project", hostId, false, project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }
    get persons() {
        return this.project.people === 1 ? "1 person" : `${this.project.people} persons`;
    }
    dragStartHandler(event) {
        event.dataTransfer.setData("text/plain", this.project.id);
        event.dataTransfer.effectAllowed = "move";
    }
    dragEndHandler(event) {
        console.log("Drag End");
    }
    configure() {
        this.element.addEventListener("dragstart", this.dragStartHandler);
        this.element.addEventListener("dragend", this.dragEndHandler);
    }
    renderContent() {
        this.element.querySelector("h2").textContent = this.project.title;
        this.element.querySelector("h3").textContent = `${this.project.people.toString()} ${this.persons} assigned`;
        this.element.querySelector("p").textContent = this.project.desc;
    }
}
__decorate([
    autobind_1.Autobind
], ProjectItem.prototype, "dragStartHandler", null);
__decorate([
    autobind_1.Autobind
], ProjectItem.prototype, "dragEndHandler", null);
exports.ProjectItem = ProjectItem;
//# sourceMappingURL=project-item.js.map