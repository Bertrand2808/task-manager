import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Task, EtatTache } from '../../models/tasks.models';
import { CRUDTaskListService } from './crud-task-list.service';
import { ByStatutTaskListService } from './by-statut-task-list.service';

describe('ByStatutTaskListService', () => {
  let service: ByStatutTaskListService;
  let crudServiceSpy: jasmine.SpyObj<CRUDTaskListService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('CRUDTaskListService', ['getTasks']);
    TestBed.configureTestingModule({
      providers: [
        ByStatutTaskListService,
        { provide: CRUDTaskListService, useValue: spy }
      ]
    });
    service = TestBed.inject(ByStatutTaskListService);
    crudServiceSpy = TestBed.inject(CRUDTaskListService) as jasmine.SpyObj<CRUDTaskListService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return tasks by statut', (done) => {
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
    service.getTasksByStatut(EtatTache.A_FAIRE).subscribe((result) => {
      expect(result).toEqual([tasks[2]]);
      done();
    });
  });
});
