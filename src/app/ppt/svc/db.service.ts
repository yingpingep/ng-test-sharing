import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

export interface User {
  id: number;
  name: string;
  departmentId: number;
  department: string;
}

@Injectable({
  providedIn: 'root',
})
export class DbService {
  constructor() {}
  getUsers(): Observable<User[]> {
    return of([
      { id: 1, name: 'Rafiki', departmentId: 1, department: 'RD' },
      { id: 2, name: 'Bro', departmentId: 2, department: 'Sales' },
      { id: 3, name: 'Amico', departmentId: 1, department: 'RD' },
      { id: 4, name: 'Pana', departmentId: 3, department: 'CEOO' },
      { id: 5, name: 'Cuate', departmentId: 3, department: 'CEOO' },
    ]);
  }
}
