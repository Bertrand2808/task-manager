import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainDeleteTaskFormComponent } from './main-delete-task-form/main-delete-task-form.component';


const routes: Routes = [
  { path: '', component: MainDeleteTaskFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeleteTaskRoutingModule { }
