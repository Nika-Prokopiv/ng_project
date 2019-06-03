import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Bill} from '../bill.model';
import {BaseApi} from '../../../shared/core/base-api';
import {Category} from '../category.model';

@Injectable({
  providedIn: 'root'
})
export class BillService extends BaseApi {

  public currencies: any[];


  constructor(public http: HttpClient) {
    super(http);
  }

  getBill(): Observable<Bill> {
    return this.get<Bill>('bill');
  }

  getCurrency(): any[] {
    return this.currencies = [
      {
        name: 'RUB',
        value: '1'
      },
      {
        name: 'USD',
        value: '0.017183'
      }, {
        name: 'EUR',
        value: '0.015343'
      }
    ];
  }

  updateBill(bill: Bill): Observable<Bill> {
    return this.put('bill', bill);
  }

}
