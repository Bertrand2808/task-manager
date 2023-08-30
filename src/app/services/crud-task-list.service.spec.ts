import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { EtatTache, Task } from '../../models/tasks.models';
import { CRUDTaskList } from './intefaces/crud-task-list';
import { CRUDTaskListService } from './crud-task-list.service';

describe('CRUDTaskListService', () => {
  let service: CRUDTaskList;
  let tasksSubject: BehaviorSubject<Task[]>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CRUDTaskListService]
    });
    service = TestBed.inject(CRUDTaskListService);
    tasksSubject = (service as any).tasksSubject;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return tasks', (done) => {
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
    tasksSubject.next(tasks);
    service.getTasks().subscribe((result) => {
      expect(result).toEqual(tasks);
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
    service.addTask(task);
    expect(tasksSubject.value).toContain(task);
  });

  it('should add task form', () => {
    const task: Task = {
      id: 4,
      titre: 'TEST',
      description: 'Test task',
      date: new Date(),
      etat: EtatTache.A_FAIRE
    };
    service.addTaskForm(task);
    expect(tasksSubject.value).toContain(task);
  });

  it('should update task', () => {
    const task: Task = {
      id: 1,
      titre: 'MENAGE',
      description: 'Faire le ménage dans la chambre',
      date: new Date(),
      etat: EtatTache.TERMINEE
    };
    service.updateTask(task);
    expect(tasksSubject.value[0].etat).toEqual(EtatTache.A_FAIRE);
  });

  it('should delete task', () => {
    const task: Task = {
      id: 1,
      titre: 'MENAGE',
      description: 'Faire le ménage dans la chambre',
      date: new Date(),
      etat: EtatTache.TERMINEE
    };
    service.deleteTask(task);
    expect(tasksSubject.value).not.toContain(task);
  });

  it('should delete task by name', () => {
    const id = 1;
    const titre = 'MENAGE';
    service.deleteTaskByName(id);
    expect(tasksSubject.value.find(t => t.titre === titre)).toBeFalsy();
  });

  it('should update task ids', () => {
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
    tasksSubject.next(tasks);
    service.updateId();
    expect(tasksSubject.value[0].id).toEqual(1);
    expect(tasksSubject.value[1].id).toEqual(2);
    expect(tasksSubject.value[2].id).toEqual(3);
  });
});
