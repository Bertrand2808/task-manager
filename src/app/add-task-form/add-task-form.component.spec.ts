import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Task, EtatTache } from '../../models/tasks.models';
import { TaskFacade } from '../services/task-facade.service';
import { AddTaskFormComponent } from './add-task-form.component';

describe('AddTaskFormComponent', () => {
  let component: AddTaskFormComponent;
  let fixture: ComponentFixture<AddTaskFormComponent>;
  let taskFacadeService: jasmine.SpyObj<TaskFacade>;

  beforeEach(async () => {
    const taskFacadeSpy = jasmine.createSpyObj('TaskFacade', ['getAllTasks', 'addTask']);

    await TestBed.configureTestingModule({
      declarations: [AddTaskFormComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: TaskFacade, useValue: taskFacadeSpy }
      ]
    }).compileComponents();

    taskFacadeService = TestBed.inject(TaskFacade) as jasmine.SpyObj<TaskFacade>;
    taskFacadeService.getAllTasks.and.returnValue(of([]));
    fixture = TestBed.createComponent(AddTaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add new task when form is submitted', () => {
    const task: Task = {
      id: 1,
      titre: 'TEST',
      description: 'Test task',
      date: new Date(),
      etat: EtatTache.A_FAIRE
    };
    taskFacadeService.addTask.and.returnValue(undefined);
    const formValues = {
      titre: task.titre,
      description: task.description
    };
    component.taskForm.setValue(formValues);
    component.onSubmit(new Event('submit'));
    expect(taskFacadeService.addTask).toHaveBeenCalledWith(jasmine.objectContaining({
      titre: 'TEST',
      description: 'Test task'
    }));
  });

  it('should not add new task when form is invalid', () => {
    component.taskForm.setValue({
      titre: '',
      description: ''
    });
    component.onSubmit(new Event('submit'));
    expect(taskFacadeService.addTask).not.toHaveBeenCalled();
  });
});
