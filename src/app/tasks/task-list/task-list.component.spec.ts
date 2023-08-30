import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { EtatTache, Task } from '../../../models/tasks.models';
import { TaskFacade } from '../../services/task-facade.service';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskFacadeService: jasmine.SpyObj<TaskFacade>;

  beforeEach(async () => {
    const taskFacadeSpy = jasmine.createSpyObj('TaskFacade', ['getAllTasks', 'getTasksByStatut', 'addTask', 'updateTask']);

    await TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      providers: [
        { provide: TaskFacade, useValue: taskFacadeSpy }
      ]
    }).compileComponents();

    taskFacadeService = TestBed.inject(TaskFacade) as jasmine.SpyObj<TaskFacade>;
    taskFacadeService.getAllTasks.and.returnValue(of([]));
    taskFacadeService.getTasksByStatut.and.returnValue(of([]));
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all tasks on init', () => {
    const tasks: Task[] = [
      {
        id: 1,
        titre: 'TEST',
        description: 'Test task',
        date: new Date(),
        etat: EtatTache.A_FAIRE
      }
    ];
    taskFacadeService.getAllTasks.and.returnValue(of(tasks));
    component.ngOnInit();
    expect(component.taskList).toEqual(tasks);
    expect(component.filteredTaskList).toEqual(tasks);
  });

  it('should get done tasks on init', () => {
    const tasks: Task[] = [
      {
        id: 1,
        titre: 'TEST',
        description: 'Test task',
        date: new Date(),
        etat: EtatTache.TERMINEE
      }
    ];
    taskFacadeService.getTasksByStatut.and.returnValue(of(tasks));
    component.ngOnInit();
    expect(component.doneTaskList).toEqual(tasks);
  });

  it('should add new task', () => {
    const task: Task = {
      id: 1,
      titre: 'TEST',
      description: 'Test task',
      date: new Date(),
      etat: EtatTache.A_FAIRE
    };
    taskFacadeService.addTask.and.returnValue(undefined);
    taskFacadeService.getAllTasks.and.returnValue(of([task]));
    component.createNewTask();
    expect(taskFacadeService.addTask).toHaveBeenCalledWith(jasmine.objectContaining({
      titre: 'Nouvelle tâche',
      description: 'Nouvelle tâche à faire'
    }));
    expect(component.taskList).toEqual([task]);
    expect(component.filteredTaskList).toEqual([task]);
  });

  it('should update filtered task list', () => {
    const tasks: Task[] = [
      {
        id: 1,
        titre: 'TEST',
        description: 'Test task',
        date: new Date(),
        etat: EtatTache.A_FAIRE
      }
    ];
    taskFacadeService.getTasksByStatut.and.returnValue(of(tasks));
    component.updateFilteredTaskList(EtatTache.A_FAIRE);
    expect(component.filteredTaskList).toEqual(tasks);
  });

  it('should reset filtered task list', () => {
    const tasks: Task[] = [
      {
        id: 1,
        titre: 'TEST',
        description: 'Test task',
        date: new Date(),
        etat: EtatTache.A_FAIRE
      }
    ];
    component.taskList = tasks;
    component.resetFilteredTaskList();
    expect(component.filteredTaskList).toEqual(tasks);
  });

  it('should update task', () => {
    const task: Task = {
      id: 1,
      titre: 'TEST',
      description: 'Test task',
      date: new Date(),
      etat: EtatTache.A_FAIRE
    };
    component.updateTask(task);
    expect(taskFacadeService.updateTask).toHaveBeenCalledWith(task);
  });
});
