import { Injectable } from '@angular/core';
import { CRUDTaskListService } from './crud-task-list.service';
import { Task } from '../../models/tasks.models';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ByStatutTaskListService extends CRUDTaskListService {
  constructor(private crudService: CRUDTaskListService) {
    super();
  }

  getTasksByStatut(statut: string): Observable<Task[]> {
    return this.crudService.getTasks().pipe(
      map(tasks => tasks.filter(task => task.etat === statut))
    );
  }
}
