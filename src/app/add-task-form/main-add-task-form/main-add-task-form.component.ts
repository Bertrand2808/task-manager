import { Component, Input } from '@angular/core';
import { Task } from '../../../models/tasks.models';
import { TaskFacade } from '../../services/task-facade.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-main-add-task-form',
  templateUrl: './main-add-task-form.component.html',
  styleUrls: ['./main-add-task-form.component.css']
})
export class MainAddTaskFormComponent {
  @Input() indexList!: number; // index de la liste
  taskList: Task[] = []; // liste des tâches
  filteredTaskList: Task[] = []; // liste des tâches filtrées
  doneTaskList: Task[] = []; // liste des tâches terminées
  // récupérer le dernier index de la liste
  get lastIndex(): number {
    return this.indexList = this.taskList.length;
  }
  constructor(private taskFacade: TaskFacade) {}

  ngOnInit(): void {
    // récupérer les tâches
    this.taskFacade.getAllTasks().subscribe((tasks: Task[]) => {
      this.taskList = tasks;
      this.filteredTaskList = this.taskList;
    });
  }
  onTaskAdded(task: Task): void {
    this.taskFacade.addTask(task);
  }
}
