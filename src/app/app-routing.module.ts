import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { DateComponent } from './date/date.component';

const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' }, // Redirection de la route racine vers 'tasks'
  { path: 'tasks', component: TaskListComponent }, // Route pour le TaskListComponent
  { path: 'date', component: DateComponent},
  { path: 'display', loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule) }, // Lazy loading du module "tasks"

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
