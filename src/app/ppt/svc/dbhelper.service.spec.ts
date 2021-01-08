import { TestBed } from '@angular/core/testing';
import { DbService } from './db.service';

import { DbhelperService } from './dbhelper.service';

describe('DbhelperService', () => {
  let spyDbSvc: jasmine.Spy;
  let service: DbhelperService;

  beforeEach(() => {
    spyDbSvc = jasmine.createSpyObj('DbService', ['getUsers']);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: DbService,
          useValue: spyDbSvc,
        },
      ],
    });
    service = TestBed.inject(DbhelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
