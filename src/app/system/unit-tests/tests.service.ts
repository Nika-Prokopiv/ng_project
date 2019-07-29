import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestsService {

  private isVisible = true;

  getIsVisible() {
    return this.isVisible;
  }

  setIsVisible(isVisible) {
    this.isVisible = isVisible;
  }

  getSomeText(): Observable<string> {
    return of('Lorem ipsum est dolor').pipe(delay(100));
  }
}
