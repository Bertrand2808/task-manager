import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMaxLengthFieldFormComponent } from '../error-max-length-field-form/error-maxLength-field-form.component';
import { ErrorMinLengthFieldFormComponent } from '../error-min-length-field-form/error-minLength-field-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ErrorRequiredFieldFormComponent } from '../error-required-field-form/error-required-field-form.component';
import { TasksModule } from '../tasks/tasks.module';
import { MainDeleteTaskFormComponent } from './main-delete-task-form/main-delete-task-form.component';
import { DeleteTaskFormComponent } from './delete-task-form.component';
import { DeleteTaskRoutingModule } from './delete-task-form-routing.module';



@NgModule({
  declarations: [
    DeleteTaskFormComponent,
    MainDeleteTaskFormComponent,
  ],
  imports: [
    CommonModule,
    DeleteTaskRoutingModule,
    TasksModule,
    ReactiveFormsModule,
    FormsModule,
    ErrorMaxLengthFieldFormComponent,
    ErrorMinLengthFieldFormComponent,
    ErrorRequiredFieldFormComponent
  ],
  exports: [
    DeleteTaskFormComponent,
    MainDeleteTaskFormComponent,
  ]
})
export class DeleteTaskFormModule { }
