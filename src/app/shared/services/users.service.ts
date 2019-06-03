import {HttpClient, HttpParams, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';
import 'rxjs/operators';
import {map} from 'rxjs/operators';
import {BaseApi} from '../core/base-api';
import {ActivatedRoute} from '@angular/router';


@Injectable()

export class UsersService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.get<User[]>(`users?email=${email}`).pipe(
      map(
        (user: User[]) => user[0] ? user[0] : undefined
      )
    );
  }

  createNewUSer(user: User): Observable<User> {
    return this.post<User>('users', user);
  }

}
