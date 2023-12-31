import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskFormComponent } from './add-task-form.component';
import { MainAddTaskFormComponent } from './main-add-task-form/main-add-task-form.component';
import { AddTaskRoutingModule } from './add-task-form-routing.module';
import { TasksModule } from '../tasks/tasks.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [
    AddTaskFormComponent,
    MainAddTaskFormComponent,
  ],
  imports: [
    CommonModule,
    AddTaskRoutingModule,
    TasksModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
    ],
  exports: [
    AddTaskFormComponent,
    MainAddTaskFormComponent,
  ]
})
export class AddTaskFormModule { }
