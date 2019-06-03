import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Category} from '../../shared/category.model';
import {CategoriesService} from '../../shared/services/categories.service';
import {Message} from '../../../shared/models/message.model';

@Component({
  selector: 'hm-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  @Input() categories: Category[];

  @Output() private categoryEdited = new EventEmitter<Category>();

  currentCategoryId = 1;
  currentCategory: Category;
  edited = false;

  message = new Message('success', '');

  constructor(public catService: CategoriesService) {
  }

  ngOnInit() {
    this.onCategoryChange();
  }

  onCategoryChange() {
    this.currentCategory = this.categories.find((c: Category) => c.id === +this.currentCategoryId);
  }

  postForm(form: NgForm) {
    const {name} = form.value;
    let {capacity} = form.value;
    if (capacity < 0) {
      capacity *= -1;
    }
    const category: Category = {name: name, capacity: capacity, id: +this.currentCategoryId};
    this.catService.editCategory(category).subscribe(
      (res: Category) => {
        this.categoryEdited.emit(res);
        this.message.text = 'Категория изменена успешно';
        setTimeout(() => {
          this.message.text = '';
        }, 3000);
      }
    );
  }
}
