import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {CategoriesService} from '../../shared/services/categories.service';
import {Category} from '../../shared/category.model';
import {Subscribable, Subscription} from 'rxjs';

@Component({
  selector: 'hm-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit, OnDestroy {

  sub: Subscription;

  @Output() private newCategoryAdded = new EventEmitter<Category>();

  constructor(public catService: CategoriesService) {
  }

  ngOnInit() {
  }

  postForm(form: NgForm) {
    const {name} = form.value;
    let {capacity} = form.value;
    if (capacity < 0) {
      capacity *= -1;
    }
    const category: Category = {name: name, capacity: capacity};
    this.sub = this.catService.addCategory(category).subscribe(
      (res: Category) => {
        this.newCategoryAdded.emit(res);
        form.reset();
      }
    );
  }

  ngOnDestroy(): void {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }


}
