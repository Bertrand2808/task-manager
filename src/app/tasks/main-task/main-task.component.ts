import { Component } from '@angular/core';
import { EtatTache, Task } from '../../../models/tasks.models'
@Component({
  selector: 'app-main-task',
  templateUrl: './main-task.component.html',
  styleUrls: ['./main-task.component.css']
})
export class MainTaskComponent {
  // création d'une nouvelle tâche
  task: Task = {
    titre : "Nouvelle tâche",
    description : "Description de la tâche",
    date : new Date(),
    etat : EtatTache.EN_COURS
  }
}
