import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EtatTache, Task } from '../../models/tasks.models';
import { TaskFacade } from '../services/task-facade.service';

@Component({
  selector: 'app-delete-task-form',
  templateUrl: './delete-task-form.component.html',
  styleUrls: ['./delete-task-form.component.css']
})
export class DeleteTaskFormComponent {
  deleteForm: FormGroup;
  indexList!: number;
  taskList: Task[] = [];
  constructor(
    private fb: FormBuilder,
    private taskFacadeService: TaskFacade
  ) {
    this.deleteForm = this.fb.group({
      titre: ['',{
        validators:[Validators.required, Validators.minLength(3), Validators.maxLength(20)],
        updateOn: 'blur'
      }]
    });
  }
  ngOnInit(): void {
    this.taskFacadeService.getAllTasks().subscribe((tasks: Task[]) => {
      this.taskList = tasks;
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    const taskName = this.deleteForm.value.titre.toUpperCase();
    console.log(taskName);

    for (let i = 0; i < this.taskList.length; i++) {
      console.log(this.taskList[i].titre);
      if (taskName === this.taskList[i].titre) {
        this.indexList = i;
        this.taskFacadeService.deleteTaskByName(this.indexList);
      }
    }
  }
}
