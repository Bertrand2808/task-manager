import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DateComponent } from './date/date.component';

const routes: Routes = [
  { path: '', redirectTo: 'display', pathMatch: 'full' }, // Redirection de la route racine vers 'tasks'
  { path: 'date', component: DateComponent},
  { path: 'add', loadChildren: () => import('./add-task-form/add-task-form.module').then(m => m.AddTaskFormModule) }, // Lazy loading du module "add-task-form"
  { path: 'delete', loadChildren: () => import('./delete-task-form/delete-task-form.module').then(m => m.DeleteTaskFormModule) }, // Lazy loading du module "delete-task-form"
  { path: 'display', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule) }, // Lazy loading du module "tasks"

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
