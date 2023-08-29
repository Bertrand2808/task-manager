import { Component, Input, OnInit } from '@angular/core';
import { EtatTache, Task } from '../../../models/tasks.models'
import { TaskFacade } from 'src/app/services/task-facade.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent  implements OnInit {
  @Input() indexList!: number; // index de la liste
  taskList: Task[] = []; // liste des tâches
  filteredTaskList: Task[] = []; // liste des tâches filtrées
  doneTaskList: Task[] = []; // liste des tâches terminées
  // récupérer le dernier index de la liste
  get lastIndex(): number {
    return this.indexList = this.taskList.length;
  }
  constructor(
    private taskFacade: TaskFacade
    ) { }
  ngOnInit(): void {
    // récupérer les tâches
    this.taskFacade.getAllTasks().subscribe((tasks: Task[]) => {
      this.taskList = tasks;
      this.filteredTaskList = this.taskList;
    });
    // récupérer les tâches terminées
    this.taskFacade.getTasksByStatut(EtatTache.TERMINEE).subscribe((doneTasks: Task[]) => {
      this.doneTaskList = doneTasks;
    });
  }
  // ajouter une tâche
  createNewTask(): void {
    const newTask: Task = {
      id: this.lastIndex + 1,
      titre: 'Nouvelle tâche',
      description: 'Nouvelle tâche à faire',
      date: new Date(),
      etat: EtatTache.A_FAIRE
    };
    this.taskFacade.addTask(newTask);
    this.taskFacade.getAllTasks().subscribe((tasks: Task[]) => {
      this.taskList = tasks;
      console.log(this.taskList);
      this.filteredTaskList = this.taskList;
      console.log(this.filteredTaskList);
    });
  }

  updateFilteredTaskList(statut: string): void {
    // vider la liste filtree
    this.filteredTaskList = [];
    this.taskFacade.getTasksByStatut(statut).subscribe(filteredTasks => {
      this.filteredTaskList = filteredTasks;
    });
  }
  resetFilteredTaskList(): void {
    this.filteredTaskList = this.taskList;
  }

  updateTask(task: Task): void {
    this.taskFacade.updateTask(task);
  }
}
