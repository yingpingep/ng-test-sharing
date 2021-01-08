import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DbService, User } from './db.service';

@Injectable({
  providedIn: 'root',
})
export class DbhelperService {
  constructor(private db: DbService) {}
  getUsersByDepartmentId(departmentId: number): Observable<User[]> {
    return this.db
      .getUsers()
      .pipe(
        map((users) => users.filter((u) => u.departmentId === departmentId))
      );
  }
}
