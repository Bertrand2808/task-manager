import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Task, EtatTache } from '../../models/tasks.models';
import { TaskFacade } from '../services/task-facade.service';
import { DeleteTaskFormComponent } from './delete-task-form.component';

describe('DeleteTaskFormComponent', () => {
  let component: DeleteTaskFormComponent;
  let fixture: ComponentFixture<DeleteTaskFormComponent>;
  let taskFacadeService: jasmine.SpyObj<TaskFacade>;

  beforeEach(async () => {
    const taskFacadeSpy = jasmine.createSpyObj('TaskFacade', ['getAllTasks', 'deleteTaskByName']);

    await TestBed.configureTestingModule({
      declarations: [DeleteTaskFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: TaskFacade, useValue: taskFacadeSpy }
      ]
    }).compileComponents();

    taskFacadeService = TestBed.inject(TaskFacade) as jasmine.SpyObj<TaskFacade>;
    taskFacadeService.getAllTasks.and.returnValue(of([]));
    fixture = TestBed.createComponent(DeleteTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should delete task when form is submitted with valid task name', () => {
    const task: Task = {
      id: 1,
      titre: 'TEST',
      description: 'Test task',
      date: new Date(),
      etat: EtatTache.A_FAIRE
    };
    taskFacadeService.getAllTasks.and.returnValue(of([task]));
    component.taskList = [task];
    component.deleteForm.setValue({
      titre: task.titre
    });
    component.onSubmit(new Event('submit'));
    expect(taskFacadeService.deleteTaskByName).toHaveBeenCalledWith(0);
  });

  it('should not delete task when form is submitted with invalid task name', () => {
    const task: Task = {
      id: 1,
      titre: 'TEST',
      description: 'Test task',
      date: new Date(),
      etat: EtatTache.A_FAIRE
    };
    taskFacadeService.getAllTasks.and.returnValue(of([task]));
    component.taskList = [task];
    component.deleteForm.setValue({
      titre: 'INVALID'
    });
    component.onSubmit(new Event('submit'));
    expect(taskFacadeService.deleteTaskByName).not.toHaveBeenCalled();
  });
});
