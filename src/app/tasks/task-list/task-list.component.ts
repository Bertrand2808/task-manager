import { Component, Input } from '@angular/core';
import { EtatTache, Task } from '../../../models/tasks.models'
import { CRUDTaskListService } from 'src/app/services/crud-task-list.service';
import { ByStatutTaskListService } from 'src/app/services/by-statut-task-list.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  @Input() index: number = 1; // index de la liste
  taskList: Task[] = []; // liste des tâches
  filteredTaskList: Task[] = []; // liste des tâches filtrées
  doneTaskList: Task[] = []; // liste des tâches terminées
  constructor(
    private crudService: CRUDTaskListService,
    private byStatutService: ByStatutTaskListService
    ) { }
  ngOnInit(): void {
    this.crudService.getTasks().subscribe((tasks: Task[]) => {
      this.taskList = tasks;
      this.filteredTaskList = this.taskList;
    });

  }
  createNewTask(): void {
    const newTask: Task = {
      titre: 'Nouvelle tâche',
      description: 'Nouvelle tâche à faire',
      date: new Date(),
      etat: EtatTache.A_FAIRE
    };
    this.crudService.addTask(newTask);
    this.crudService.getTasks().subscribe((tasks: Task[]) => {
      this.taskList = tasks;
      console.log(this.taskList);
      this.filteredTaskList = this.taskList;
      console.log(this.filteredTaskList);
    });
  }

  updateFilteredTaskList(statut: string): void {
    // vider la liste filtree
    this.filteredTaskList = [];
    this.byStatutService.getTasksByStatut(statut).subscribe(filteredTasks => {
      this.filteredTaskList = filteredTasks;
    });
  }
  resetFilteredTaskList(): void {
    this.filteredTaskList = this.taskList;
  }
}
