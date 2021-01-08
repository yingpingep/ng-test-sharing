import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DbService } from './db.service';

import { DbhelperService } from './dbhelper.service';

xdescribe('Showing what xdescribe can do', () => {
  let dbService: DbService;
  let service: DbhelperService;

  beforeEach(() => {
    const spyDbSvc: {
      [k in keyof DbService]: jasmine.Spy;
    } = jasmine.createSpyObj('DbService', ['getUsers']);
    spyDbSvc.getUsers.and.returnValue(
      of([
        { id: 1, name: 'Rafiki', departmentId: 1, department: 'RD' },
        { id: 2, name: 'Bro', departmentId: 2, department: 'Sales' },
        { id: 3, name: 'Amico', departmentId: 1, department: 'RD' },
        { id: 4, name: 'Pana', departmentId: 3, department: 'CEOO' },
        { id: 5, name: 'Cuate', departmentId: 3, department: 'CEOO' },
      ])
    );
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DbService,
          useValue: spyDbSvc,
        },
      ],
    });
    dbService = TestBed.inject(DbService);
    service = TestBed.inject(DbhelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call DbService.getUsers', () => {
    service.getUsersByDepartmentId(1).subscribe(() => {
      expect(dbService.getUsers).toHaveBeenCalled();
    });
  });

  it('should only return users where their departmentId are 1', () => {
    service.getUsersByDepartmentId(1).subscribe((users) => {
      users.forEach((user) => {
        expect(user.departmentId).toBe(1);
      });
    });
  });

  it('should only return users where their departmentId are 2', () => {
    service.getUsersByDepartmentId(1).subscribe((users) => {
      users.forEach((user) => {
        expect(user.departmentId).toBe(2);
      });
    });
  });
});
