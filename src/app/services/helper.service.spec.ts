import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HelperService } from './helper.service';

describe('HelperService', () => {
  let service: HelperService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(HelperService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('shoud return { server: string; ixid: string; img: string }', () => {
    service.getImg(0).subscribe((res) => {
      expect(res.server).toEqual('images.unsplash.com');
      expect(res.ixid).toEqual(
        'MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D'
      );
      expect(res.img).toContain('blob');
    });
    const req = httpTestingController.expectOne(
      'https://images.unsplash.com/photo-1598188306155-25e400eb5078?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1934&q=80'
    );
    req.flush(new ArrayBuffer(1229));
  });
});
