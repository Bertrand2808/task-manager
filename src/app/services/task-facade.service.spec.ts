import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Task, EtatTache } from '../../models/tasks.models';
import { CRUDTaskListService } from './crud-task-list.service';
import { ByStatutTaskListService } from './by-statut-task-list.service';
import { TaskFacade } from './task-facade.service';

describe('TaskFacade', () => {
  let facade: TaskFacade;
  let crudServiceSpy: jasmine.SpyObj<CRUDTaskListService>;
  let byStatutServiceSpy: jasmine.SpyObj<ByStatutTaskListService>;

  beforeEach(() => {
    const crudSpy = jasmine.createSpyObj('CRUDTaskListService', [
      'getTasks',
      'addTask',
      'addTaskForm',
      'updateTask',
      'deleteTask',
      'deleteTaskByName'
    ]);
    const byStatutSpy = jasmine.createSpyObj('ByStatutTaskListService', [
      'getTasksByStatut'
    ]);
    TestBed.configureTestingModule({
      providers: [
        TaskFacade,
        { provide: CRUDTaskListService, useValue: crudSpy },
        { provide: ByStatutTaskListService, useValue: byStatutSpy }
      ]
    });
    facade = TestBed.inject(TaskFacade);
    crudServiceSpy = TestBed.inject(CRUDTaskListService) as jasmine.SpyObj<CRUDTaskListService>;
    byStatutServiceSpy = TestBed.inject(ByStatutTaskListService) as jasmine.SpyObj<ByStatutTaskListService>;
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('should get all tasks', (done) => {
    const tasks: Task[] = [
      {
        id: 1,
        titre: 'MENAGE',
        description: 'Faire le ménage dans la chambre',
        date: new Date(),
        etat: EtatTache.TERMINEE
      },
      {
        id: 2,
        titre: 'CUISINE',
        description: 'Faire la cuisine pour le repas du soir',
        date: new Date(),
        etat: EtatTache.EN_COURS
      },
      {
        id: 3,
        titre: 'ANGULAR',
        description: 'Finir le cours électif Angular',
        date: new Date(),
        etat: EtatTache.A_FAIRE
      },
    ];
    crudServiceSpy.getTasks.and.returnValue(of(tasks));
    facade.getAllTasks().subscribe((result) => {
      expect(result).toEqual(tasks);
      done();
    });
  });

  it('should get tasks by statut', (done) => {
    const tasks: Task[] = [
      {
        id: 1,
        titre: 'MENAGE',
        description: 'Faire le ménage dans la chambre',
        date: new Date(),
        etat: EtatTache.TERMINEE
      },
      {
        id: 2,
        titre: 'CUISINE',
        description: 'Faire la cuisine pour le repas du soir',
        date: new Date(),
        etat: EtatTache.EN_COURS
      },
      {
        id: 3,
        titre: 'ANGULAR',
        description: 'Finir le cours électif Angular',
        date: new Date(),
        etat: EtatTache.A_FAIRE
      },
    ];
    byStatutServiceSpy.getTasksByStatut.and.returnValue(of([tasks[2]]));
    facade.getTasksByStatut(EtatTache.A_FAIRE).subscribe((result) => {
      expect(result).toEqual([tasks[2]]);
      done();
    });
  });

  it('should add task', () => {
    const task: Task = {
      id: 4,
      titre: 'TEST',
      description: 'Test task',
      date: new Date(),
      etat: EtatTache.A_FAIRE
    };
    facade.addTask(task);
    expect(crudServiceSpy.addTask).toHaveBeenCalledWith(task);
  });

  it('should add task from form', () => {
    const task: Task = {
      id: 4,
      titre: 'TEST',
      description: 'Test task',
      date: new Date(),
      etat: EtatTache.A_FAIRE
    };
    facade.addTaskForm(task);
    expect(crudServiceSpy.addTaskForm).toHaveBeenCalledWith(task);
  });

  it('should update task', () => {
    const task: Task = {
      id: 1,
      titre: 'MENAGE',
      description: 'Faire le ménage dans la chambre',
      date: new Date(),
      etat: EtatTache.TERMINEE
    };
    facade.updateTask(task);
    expect(crudServiceSpy.updateTask).toHaveBeenCalledWith(task);
  });

  it('should delete task', () => {
    const task: Task = {
      id: 1,
      titre: 'MENAGE',
      description: 'Faire le ménage dans la chambre',
      date: new Date(),
      etat: EtatTache.TERMINEE
    };
    facade.deleteTask(task);
    expect(crudServiceSpy.deleteTask).toHaveBeenCalledWith(task);
  });

  it('should delete task by name', () => {
    const id = 1;
    facade.deleteTaskByName(id);
    expect(crudServiceSpy.deleteTaskByName).toHaveBeenCalledWith(id);
  });
});
