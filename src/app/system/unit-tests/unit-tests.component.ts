import {Component, OnInit} from '@angular/core';
import {TestsService} from './tests.service';

@Component({
  selector: 'hm-unit-tests',
  templateUrl: './unit-tests.component.html',
  styleUrls: ['./unit-tests.component.scss'],
})
export class UnitTestsComponent implements OnInit {
  public title = 'unit test component title';
  public words: string;

  public isVisible: boolean;

  constructor(private service: TestsService) {
  }

  ngOnInit() {
    this.isVisible = this.service.getIsVisible();
    this.service.getSomeText().subscribe(
      t => {
        this.words = t;
        console.log(this.words);
      });
  }

}
