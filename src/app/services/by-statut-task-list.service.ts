import { Injectable } from '@angular/core';
import { CRUDTaskListService } from './crud-task-list.service';
import { Task } from '../../models/tasks.models';
import { Observable, map } from 'rxjs';
import { ByStatutTaskList } from './intefaces/by-status-task-list';

@Injectable({
  providedIn: 'root',
})
export class ByStatutTaskListService implements ByStatutTaskList {
  constructor(private crudService: CRUDTaskListService) {}
  getTasksByStatut(statut: string): Observable<Task[]> {
    return this.crudService
      .getTasks()
      .pipe(map((tasks) => tasks.filter((task) => task.etat === statut)));
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
  updateTask(task: Task): void {
    throw new Error('Method not implemented.');
  }
  addTaskForm(task: Task): void {
    throw new Error('Method not implemented.');
  }
  deleteTaskByName(id: number): void {
    throw new Error('Method not implemented.');
  }
  updateId(): void {
    throw new Error('Method not implemented.');
  }
}
