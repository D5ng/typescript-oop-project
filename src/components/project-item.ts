import { Component } from "./base-components"
import { Draggble } from "../models/drag-drop"
import { Autobind } from "../decorator/autobind"

export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggble {
  private project: Project

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id)
    this.project = project
    this.configure()
    this.renderContent()
  }

  get persons() {
    return this.project.people === 1 ? "1 person" : `${this.project.people} persons`
  }

  @Autobind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData("text/plain", this.project.id)
    event.dataTransfer!.effectAllowed = "move"
  }

  @Autobind
  dragEndHandler(event: DragEvent): void {
    console.log("Drag End")
  }

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler)
    this.element.addEventListener("dragend", this.dragEndHandler)
  }
  renderContent() {
    this.element.querySelector("h2")!.textContent = this.project.title
    this.element.querySelector("h3")!.textContent = `${this.project.people.toString()} ${this.persons} assigned`
    this.element.querySelector("p")!.textContent = this.project.desc
  }
}
