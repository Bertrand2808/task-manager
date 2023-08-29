import { Task } from '../../models/tasks.models';
import { Observable } from 'rxjs';

export interface CRUDTaskList {
  getTasks(): Observable<Task[]>;
  addTask(task: Task): void;
}
