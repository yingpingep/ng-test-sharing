import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HelperService } from '../services/helper.service';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let spyHelper: { getImg: jasmine.Spy };

  beforeEach(async () => {
    spyHelper = jasmine.createSpyObj('spyHelper', ['getImg']);
    spyHelper.getImg.and.returnValue(
      of({ server: '', ixid: '', img: 'testPath' })
    );
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HelperService,
          useValue: spyHelper,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    const theDeImg = fixture.debugElement.query((de) => de.references.theOnlyImg);
    expect(theDeImg).toBeTruthy();
  });

  describe('when click', () => {
    it('should call helperService', () => {
      component.click();
      expect(spyHelper.getImg).toHaveBeenCalledOnceWith(0);

      component.click();
      expect(spyHelper.getImg).toHaveBeenCalledWith(1);
    });

    it('should change img src', () => {
      component.click();
      fixture.detectChanges();

      const theDeImg = fixture.debugElement.query(
        (de) => de.references.theOnlyImg
      );
      expect(theDeImg.nativeElement.src).toContain('testPath');
    });
  });
});
