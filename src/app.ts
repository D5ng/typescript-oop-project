// ! 이름뒤에 able로 끝나는것이 네이밍 관습이다.
interface Validatable {
  value: string | number
  required?: boolean
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
}

// ! 유효성 체크
function validate(validatableInput: Validatable) {
  let isValid = true

  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0
  }

  if (validatableInput.minLength != null && typeof validatableInput.value === "string") {
    isValid = isValid && validatableInput.value.length > validatableInput.minLength
  }

  if (validatableInput.maxLength != null && typeof validatableInput.value === "string") {
    isValid = isValid && validatableInput.value.length < validatableInput.maxLength
  }

  if (validatableInput.min != null && typeof validatableInput.value === "number") {
    isValid = isValid && validatableInput.value >= validatableInput.min
  }

  if (validatableInput.max != null && typeof validatableInput.value === "number") {
    isValid = isValid && validatableInput.value <= validatableInput.max
  }

  return isValid
}

// ! 메서드 데코레이터 바인딩
function Autobind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value
  return {
    get() {
      return originalMethod.bind(this)
    },
  }
}

enum ProjectStatus {
  Active,
  Finished,
}

// ! 프로젝트 타입
class Project {
  constructor(
    public id: string,
    public title: string,
    public desc: string,
    public people: number,
    public status: ProjectStatus
  ) {
    this.id = id
    this.title = title
    this.desc = desc
    this.people = people
  }
}

type Listener<T> = (item: T[]) => void

class State<T> {
  protected listeners: Listener<T>[] = []

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn)
  }
}

// ! 전역 상태관리
class ProjectState extends State<Project> {
  private projects: Project[] = []
  private static instance: ProjectState

  private constructor() {
    super()
  }

  static getInstance() {
    if (this.instance) {
      return this.instance
    }
    this.instance = new ProjectState()
    return this.instance
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(Math.random().toString(), title, description, numOfPeople, ProjectStatus.Active)
    this.projects.push(newProject)
    for (const listenerFn of this.listeners) {
      listenerFn([...this.projects])
    }
  }
}

const projectState = ProjectState.getInstance()

// ! 컴포넌트
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement
  hostElement: T
  element: U

  constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) {
    this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement
    this.hostElement = document.getElementById(hostElementId)! as T
    const importedNode = document.importNode(this.templateElement.content, true)
    this.element = importedNode.firstElementChild! as U
    if (newElementId) this.element.id = newElementId
    this.attach(insertAtStart)
  }

  private attach(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(insertAtBeginning ? "afterbegin" : "beforeend", this.element)
  }

  abstract configure(): void
  abstract renderContent(): void
}

//! 프로젝트 폼 생성 및 사용자 입력 수집 담당하는 클래스
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement
  descriptionInputElement: HTMLInputElement
  peopleInputElement: HTMLInputElement

  constructor() {
    super("project-input", "app", true, "user-input")
    this.titleInputElement = this.element.querySelector("#title")! as HTMLInputElement
    this.descriptionInputElement = this.element.querySelector("#description")! as HTMLInputElement
    this.peopleInputElement = this.element.querySelector("#people")! as HTMLInputElement
    this.configure()
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler)
  }

  renderContent() {}

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value
    const enteredDescription = this.descriptionInputElement.value
    const enteredPeople = this.peopleInputElement.value

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true,
    }

    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    }

    const peopleValidatable: Validatable = {
      value: +enteredPeople,
      required: true,
      min: 1,
    }

    if (!validate(titleValidatable) || !validate(descriptionValidatable) || !validate(peopleValidatable)) {
      alert("Invalid Input please try again!")
      return
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople]
    }
  }

  private clearInputs() {
    this.titleInputElement.value = ""
    this.descriptionInputElement.value = ""
    this.peopleInputElement.value = ""
  }

  @Autobind
  private submitHandler(event: Event) {
    event.preventDefault()
    const userInput = this.gatherUserInput()
    if (Array.isArray(userInput)) {
      const [title, desc, people] = userInput
      projectState.addProject(title, desc, people)
      this.clearInputs()
    }
  }
}

// ! 프로젝트 목록 생성 담당 클래스
class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  assignedProjects: Project[] = []

  constructor(private type: "active" | "finished" = "active") {
    super("project-list", "app", false, `${type}-projects`)
    this.assignedProjects = []
    this.configure()
    this.renderContent()
  }

  configure() {
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
      const listItem = document.createElement("li")
      listItem.textContent = prjItem.title
      listEl.appendChild(listItem)
    }
  }
}

const projectInput = new ProjectInput()
const activeProject = new ProjectList("active")
const finishedProject = new ProjectList("finished")
