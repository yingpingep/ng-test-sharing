import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  private subject = new Subject<string>();
  private cats = [
    'https://images.unsplash.com/photo-1598188306155-25e400eb5078?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80',
    'https://images.unsplash.com/photo-1556582305-528bffcf7af0?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=634&q=80',
  ];
  constructor(private httpClient: HttpClient) {}
  getImg(
    id: number
  ): Observable<{ server: string; ixid: string; img: string }> {
    return this.httpClient
      .get(this.cats[id], { observe: 'body', responseType: 'arraybuffer' })
      .pipe(
        map((response) => {
          const matchArr = this.cats[id].match(/https:\/{2}(.*)\/.*ixid=(.*)/);
          const server = matchArr ? matchArr[1] : 'undefined';
          const ixid = matchArr ? matchArr[2] : 'undefined';
          return {
            server,
            ixid: ixid.split('&')[0],
            img: URL.createObjectURL(
              new Blob([response], { type: 'image/png' })
            ),
          };
        })
      );
  }
}
