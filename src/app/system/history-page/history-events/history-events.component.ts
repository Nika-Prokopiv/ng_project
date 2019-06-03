import {Component, Input, OnInit} from '@angular/core';
import {RecordsEvent} from '../../shared/event.model';
import {Category} from '../../shared/category.model';

@Component({
  selector: 'hm-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  searchValue = '';
  searchPlaceholder = 'Поиск';
  searchFiled = 'amount';
  searchFieldName = 'Параметр';

  @Input() events: RecordsEvent[];
  @Input() categories: Category[];

  constructor() {
  }

  ngOnInit() {
    this.events.forEach((e) => {
      e.catName = this.categories.find((c) => c.id === e.category).name;
    });
  }

  // getCategoryName(id: number) {
  //   return this.categories.find((c) => c.id === id).name;
  // }

  getEventClass(e: RecordsEvent) {
    return e.type === 'outcome' ? 'label label-danger' : 'label label-success';
  }

  changeFilterCriteria(paramName: string) {

    const namesMap = {
      amount: 'Сумма',
      date: 'Дата',
      category: 'Категория',
      type: 'Тип'
    };
    this.searchPlaceholder = namesMap[paramName];
    this.searchFieldName = namesMap[paramName];
    this.searchFiled = paramName;
  }
}
