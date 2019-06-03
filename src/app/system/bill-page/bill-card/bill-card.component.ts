import {Component, Input, OnInit} from '@angular/core';
import {Bill} from '../../shared/bill.model';

@Component({
  selector: 'hm-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  @Input() billData: Bill;

  constructor() { }

  ngOnInit() {
  }

}
