// création du component qui va initialiser une tache et afficher ses données
import { EtatTache, Task } from '../../../models/tasks.models';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent {
  @Input() task!: Task;
  @Input() indexTask: number = 1;
  constructor() { }
  ngOnInit(): void {}
}
