import { EtatTache, Task } from '../../../models/tasks.models';
import { Component, Input, OnInit } from '@angular/core';
import { TaskFacade } from 'src/app/services/task-facade.service';
import { DateFormatComponent } from 'src/app/date-format/date-format.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent {
  @Input() task!: Task;
  @Input() lastIndex!: number;
  constructor(private taskFacade: TaskFacade) { }
  ngOnInit(): void {}

  // changer l'état de la tâche
  updateStatut(task: Task): void {
    this.taskFacade.updateTask(task);
  }

  // supprimer une tâche
  deleteTask(task: Task): void {
    this.taskFacade.deleteTask(task);
  }
}
