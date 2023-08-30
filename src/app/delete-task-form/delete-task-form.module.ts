import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TasksModule } from '../tasks/tasks.module';
import { MainDeleteTaskFormComponent } from './main-delete-task-form/main-delete-task-form.component';
import { DeleteTaskFormComponent } from './delete-task-form.component';
import { DeleteTaskRoutingModule } from './delete-task-form-routing.module';
import { SharedModule } from '../shared/shared.module';

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
    SharedModule
  ],
  exports: [
    DeleteTaskFormComponent,
    MainDeleteTaskFormComponent,
  ]
})
export class DeleteTaskFormModule { }
