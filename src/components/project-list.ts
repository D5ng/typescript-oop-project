import { Component } from "./base-components"
import { DragTarget } from "../models/drag-drop"
import { ProjectItem } from "./project-item"
import { Autobind } from "../decorator/autobind"
import { projectState } from "../state/project-state"

// ! 프로젝트 목록 생성 담당 클래스
export class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
  assignedProjects: Project[] = []

  constructor(private type: "active" | "finished" = "active") {
    super("project-list", "app", false, `${type}-projects`)
    this.assignedProjects = []
    this.configure()
    this.renderContent()
  }

  @Autobind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      event.preventDefault()
      const listEl = this.element.querySelector("ul")!
      listEl.classList.add("droppable")

      console.log(this.type)
    }
  }

  @Autobind
  dragLeaveHandler(event: DragEvent): void {
    const listEl = this.element.querySelector("ul")!
    listEl.classList.remove("droppable")
  }

  @Autobind
  dropHandler(event: DragEvent): void {
    const projectId = event.dataTransfer!.getData("text/plain")
    projectState.moveProject(projectId, this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished)
  }

  configure() {
    this.element.addEventListener("dragover", this.dragOverHandler)
    this.element.addEventListener("dragleave", this.dragLeaveHandler)
    this.element.addEventListener("drop", this.dropHandler)

    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter((project) => {
        return this.type === "active"
          ? project.status === ProjectStatus.Active
          : project.status === ProjectStatus.Finished
      })
      this.assignedProjects = relevantProjects
      this.renderProjects()
    })
  }

  renderContent() {
    const listId = `${this.type}-projects-list`
    this.element.querySelector("ul")!.id = listId
    this.element.querySelector("h2")!.textContent = `${this.type.toUpperCase()} PROJECTS`
  }

  private renderProjects() {
    const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement
    listEl.innerHTML = ""
    for (const prjItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector("ul")!.id, prjItem)
    }
  }
}
