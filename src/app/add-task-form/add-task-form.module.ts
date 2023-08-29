import { ErrorRequiredFieldFormComponent } from '../shared/error-required-field-form/error-required-field-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTaskFormComponent } from './add-task-form.component';
import { MainAddTaskFormComponent } from './main-add-task-form/main-add-task-form.component';
import { AddTaskRoutingModule } from './add-task-form-routing.module';
import { TasksModule } from '../tasks/tasks.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorMinLengthFieldFormComponent } from '../shared/error-min-length-field-form/error-minLength-field-form.component';
import { ErrorMaxLengthFieldFormComponent } from '../shared/error-max-length-field-form/error-maxLength-field-form.component';


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
    ErrorMinLengthFieldFormComponent,
    ErrorMaxLengthFieldFormComponent,
    ErrorRequiredFieldFormComponent
    ],
  exports: [
    AddTaskFormComponent,
    MainAddTaskFormComponent,
  ]
})
export class AddTaskFormModule { }
