import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DbService } from './db.service';

import { DbhelperService } from './dbhelper.service';

describe('DbhelperService using spyOn', () => {
  let spyGetUsers: jasmine.Spy;
  let service: DbhelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    const dbService = TestBed.inject(DbService);
    service = TestBed.inject(DbhelperService);
    spyGetUsers = spyOn(dbService, 'getUsers').and.returnValue(
      of([
        { id: 1, name: 'Rafiki', departmentId: 1, department: 'RD' },
        { id: 2, name: 'Bro', departmentId: 2, department: 'Sales' },
        { id: 3, name: 'Amico', departmentId: 1, department: 'RD' },
        { id: 4, name: 'Pana', departmentId: 3, department: 'CEOO' },
        { id: 5, name: 'Cuate', departmentId: 3, department: 'CEOO' },
      ])
    );
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call DbService.getUsers', () => {
    service.getUsersByDepartmentId(1).subscribe(() => {
      expect(spyGetUsers).toHaveBeenCalled();
    });
  });

  it('should only return users where their departmentId are 1', () => {
    service.getUsersByDepartmentId(1).subscribe((users) => {
      users.forEach((user) => {
        expect(user.departmentId).toBe(1);
      });
    });
  });
});
