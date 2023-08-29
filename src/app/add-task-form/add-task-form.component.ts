import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EtatTache, Task } from '../../models/tasks.models';
import { TaskFacade } from '../services/task-facade.service';

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.css']
})
export class AddTaskFormComponent {
  indexList?: number;
  taskForm: FormGroup;
  taskList: Task[] = [];
  lastIndex: number = 0;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private taskFacadeService: TaskFacade
    ) {
    this.taskForm = this.fb.group({
      titre: ['',{
        validators:[Validators.required, Validators.minLength(3), Validators.maxLength(20)],
        updateOn: 'blur'
      }
    ],
      description: ['',{
        validators: [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
        updateOn: 'blur'
      }]
    });
  }

  ngOnInit(): void {
    this.taskFacadeService.getAllTasks().subscribe((tasks: Task[]) => {
      this.taskList = tasks;
    });
    console.log(this.taskList);
    this.lastIndex = this.taskList.length;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    console.log(this.taskForm.valid);
    if (this.taskForm.valid) {
      const newTask: Task = {
        id: this.lastIndex + 1,
        titre: this.taskForm.value.titre,
        description: this.taskForm.value.description,
        date: new Date(),
        etat: EtatTache.A_FAIRE
      };
      console.log(newTask);
      this.taskFacadeService.addTask(newTask);
      this.lastIndex = this.taskList.length;
      this.taskForm.reset();
    }
  }
}
