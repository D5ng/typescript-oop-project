enum ProjectStatus {
  Active, // 0
  Finished, // 1
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
