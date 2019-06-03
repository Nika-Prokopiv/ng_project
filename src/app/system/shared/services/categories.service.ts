import {BaseApi} from '../../../shared/core/base-api';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Category} from '../category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends BaseApi {
  constructor(public http: HttpClient) {
    super(http);
  }

  getCategories(): Observable<Category[]> {
    return this.get<Category[]>('categories');
  }

  addCategory(category: Category): Observable<Category> {
    return this.post<Category>('categories', category);
  }

  editCategory(category: Category): Observable<Category> {
    return this.put<Category>(`categories/${category.id}`, category);
  }

}
