import {Component, OnInit} from '@angular/core';
import {BillService} from '../shared/services/bill.service';
import {Bill} from '../shared/bill.model';
import {Observable} from 'rxjs';

@Component({
  selector: 'hm-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit {

  public bill: Bill;
  public currency: any = {};
  public isLoaded = false;

  constructor(private billService: BillService) {
  }

  ngOnInit() {
    this.getBill();
  }

  refreshData() {
    this.getBill();
  }

  getBill() {
    this.isLoaded = false;
    this.billService.getBill().subscribe(
      (res: Bill) => {
        this.bill = res;
        this.isLoaded = true;
      }
    );
    this.currency = this.billService.getCurrency();
  }

}
