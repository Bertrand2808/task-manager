import { Injectable } from '@angular/core';
import { CRUDTaskListService } from './crud-task-list.service';
import { Task } from '../../models/tasks.models';
import { Observable, map } from 'rxjs';
import { ByStatutTaskList } from '../intefaces/by-status-task-list';

@Injectable({
  providedIn: 'root'
})
export class ByStatutTaskListService implements ByStatutTaskList {
  constructor(private crudService: CRUDTaskListService) {
  }
  getTasks(): Observable<Task[]> {
    throw new Error('Method not implemented.');
  }
  addTask(task: Task): void {
    throw new Error('Method not implemented.');
  }
  deleteTask(task: Task): void {
    throw new Error('Method not implemented.');
  }

  getTasksByStatut(statut: string): Observable<Task[]> {
    return this.crudService.getTasks().pipe(
      map(tasks => tasks.filter(task => task.etat === statut))
    );
  }
}
