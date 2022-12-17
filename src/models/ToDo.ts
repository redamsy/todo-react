export interface ToDo {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  completed: boolean;
  date: Date;
  createdBy: string;
}

// export class ToDoClass {
//   id: string;
//   title: string;
//   description: string;
//   priority: Priority;
//   completed: boolean;
//   date: Date;
//   createdBy: string;

//   public constructor(
//     id: string,
//     title: string,
//     description: string,
//     priority: Priority,
//     completed: boolean,
//     date: Date,
//     createdBy: string
//   ) {
//     this.id = id;
//     this.title = title;
//     this.description = description;
//     this.priority = priority;
//     this.completed = completed;
//     this.date = date;
//     this.createdBy = createdBy;
//   }
// }

export enum Priority {
  A = "A",
  B = "B",
  C = "C",
}

export interface IToDoBody {
  id?: string;
  title: string;
  description: string;
  priority: Priority;
  completed: boolean;
  date: Date;
}

export interface IToDoForm {
  id?: string;
  title: string;
  description: string;
  priority: Priority;
  completed: boolean;
  date: string;
}
