import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../../models/tasks.models';
import { CRUDTaskListService } from './crud-task-list.service';
import { ByStatutTaskListService } from './by-statut-task-list.service';

@Injectable({
  providedIn: 'root'
})
export class TaskFacade {
  constructor(
    private crudService: CRUDTaskListService,
    private byStatutService: ByStatutTaskListService
  ) {}

  getAllTasks(): Observable<Task[]> {
    return this.crudService.getTasks();
  }

  getTasksByStatut(statut: string): Observable<Task[]> {
    return this.byStatutService.getTasksByStatut(statut);
  }

  addTask(task: Task): void {
    this.crudService.addTask(task);
  }

  updateTask(task: Task): void {
    this.crudService.updateTask(task);
  }

  deleteTask(task: Task): void {
    this.crudService.deleteTask(task);
  }
}
