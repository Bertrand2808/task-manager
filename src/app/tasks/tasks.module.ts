import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EtatColorDirective } from './etat-color.directive';
import { TaskComponent } from './task/task.component';
import { MainTaskComponent } from './main-task/main-task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TasksRoutingModule } from './tasks-routing.module';
import { DateFormatModule } from "../date-format/date-format.module";



@NgModule({
    declarations: [
        EtatColorDirective,
        TaskComponent,
        MainTaskComponent,
        TaskListComponent,
    ],
    exports: [
        MainTaskComponent,
        TaskListComponent,
        TaskComponent,
        MainTaskComponent,
    ],
    imports: [
        CommonModule,
        TasksRoutingModule,
        DateFormatModule
    ]
})
export class TasksModule { }
