import { Task } from '../../../models/tasks.models';
import { Observable } from 'rxjs';

export interface CRUDTaskList {
  getTasks(): Observable<Task[]>;
  addTask(task: Task): void;
  deleteTask(task: Task): void;
  updateTask(task: Task): void;
  addTaskForm(task: Task): void;
  deleteTaskByName(id: number): void;
  updateId(): void;
}
