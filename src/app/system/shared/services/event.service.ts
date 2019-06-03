import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {BaseApi} from '../../../shared/core/base-api';
import {RecordsEvent} from '../event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getEvents(): Observable<RecordsEvent[]> {
    return this.get<RecordsEvent[]>('events');
  }

  addEvent(event: RecordsEvent): Observable<RecordsEvent> {
    return this.post<RecordsEvent>('events', event);
  }
}
