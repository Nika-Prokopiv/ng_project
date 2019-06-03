import {Component, OnInit} from '@angular/core';
import {Category} from '../shared/category.model';
import {CategoriesService} from '../shared/services/categories.service';
import {Message} from '../../shared/models/message.model';

@Component({
  selector: 'hm-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.scss']
})
export class RecordsPageComponent implements OnInit {

  categories: Category[];
  isLoaded = false;

  constructor(private catService: CategoriesService) {
  }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.isLoaded = false;
    this.catService.getCategories().subscribe(
      (res: Category[]) => {
        this.categories = res;
        this.isLoaded = true;
      }
    );
  }

  newCatAdded(item: Category) {
    this.categories.push(item);
  }

  categoryEdited(item: Category) {
    const changedItem = this.categories.find((c) => c.id === item.id);
    changedItem.name = item.name;
    changedItem.capacity = item.capacity;
  }

}
