import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  count = 0;
  @ViewChild('theOnlyImg') img: ElementRef<HTMLImageElement>;
  constructor(private helper: HelperService) {}

  ngOnInit(): void {}

  click(): void {
    this.helper.getImg(this.count % 2).subscribe((v) => {
      this.img.nativeElement.src = v.img;
    });
    this.count += 1;
  }
}
