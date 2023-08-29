import { Task } from '../../../models/tasks.models';
import { CRUDTaskList } from './crud-task-list';
import { Observable } from 'rxjs';

export interface ByStatutTaskList extends CRUDTaskList {
  getTasksByStatut(statut: string): Observable<Task[]>;
}
