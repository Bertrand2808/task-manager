import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EtatTache, Task } from '../../models/tasks.models';

@Injectable({
  providedIn: 'root'
})
export class CRUDTaskListService {
  public tasks: Task[] = [
    {
      titre: 'Ménage',
      description: 'Faire le ménage dans la chambre',
      date: new Date(),
      etat: EtatTache.TERMINEE
    },
    {
      titre: 'Cuisine',
      description: 'Faire la cuisine pour le repas du soir',
      date: new Date(),
      etat: EtatTache.EN_COURS
    },
    {
      titre: 'Angular',
      description: 'Finir le cours électif Angular',
      date: new Date(),
      etat: EtatTache.A_FAIRE
    },
  ];
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this.tasks);

  constructor() {
  }

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  addTask(task: Task): void {
    this.tasks.push(task);
    this.tasksSubject.next(this.tasks);
  }
}
