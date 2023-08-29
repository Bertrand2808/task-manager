import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EtatTache, Task } from '../../models/tasks.models';
import { CRUDTaskList } from '../intefaces/crud-task-list';

@Injectable({
  providedIn: 'root'
})
export class CRUDTaskListService implements CRUDTaskList{
  public tasks: Task[] = [
    {
      id: 1,
      titre: 'Ménage',
      description: 'Faire le ménage dans la chambre',
      date: new Date(),
      etat: EtatTache.TERMINEE
    },
    {
      id: 2,
      titre: 'Cuisine',
      description: 'Faire la cuisine pour le repas du soir',
      date: new Date(),
      etat: EtatTache.EN_COURS
    },
    {
      id: 3,
      titre: 'Angular',
      description: 'Finir le cours électif Angular',
      date: new Date(),
      etat: EtatTache.A_FAIRE
    },
  ];
  private tasksSubject: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this.tasks);

  constructor() {}

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  addTask(task: Task): void {
    this.tasks.push(task);
    this.tasksSubject.next(this.tasks);
  }

  updateTask(task: Task): void {
    const index = this.tasks.findIndex(t => t.id === task.id);
    if (this.tasks[index].etat === EtatTache.A_FAIRE) {
      this.tasks[index].etat = EtatTache.EN_COURS;
    } else if (this.tasks[index].etat === EtatTache.EN_COURS) {
      this.tasks[index].etat = EtatTache.TERMINEE;
    } else {
      this.tasks[index].etat = EtatTache.A_FAIRE;
    }
    this.tasksSubject.next(this.tasks);
  }

  deleteTask(task: Task): void {
    const index = this.tasks.findIndex(t => t.id === task.id);
    this.tasks.splice(index, 1);
    this.tasksSubject.next(this.tasks);
    this.updateId();
  }

  updateId(): void {
    this.tasks.forEach((task, index) => {
      task.id = index + 1;
    });
    this.tasksSubject.next(this.tasks);
  }
}
