import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Category} from '../../shared/category.model';

@Component({
  selector: 'hm-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {
  @Output() cancelFilter = new EventEmitter<any>();
  @Output() applyFilter = new EventEmitter<any>();
  @Input() categories: Category[] = [];

  selectedCategories: Category[] = [];
  selectedPeriod = 'day';
  timePeriods = [
    {type: 'day', label: 'День'},
    {type: 'week', label: 'Неделя'},
    {type: 'month', label: 'Месяц'}
  ];

  selectedTypes = [];
  eventTypes = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];

  ngOnInit() {
  }

  closeFilter() {
    this.selectedTypes = [];
    this.selectedCategories = [];
    this.selectedPeriod = 'd';
    this.cancelFilter.emit();
  }

  changedType({checked, value}) {
    this.selectedTypes = this.handleArray(this.selectedTypes, {checked, value});
  }

  changedCategory({checked, value}) {
    this.selectedCategories = this.handleArray(this.selectedCategories, {checked, value});
  }

  private handleArray(array, {checked, value}) {
    if (checked) {
      if (!array.includes(value)) {
        array.push(value);
      }
    } else {
      array = array.filter(x => x !== value);
    }
    return array;
  }

  saveFilter() {
    this.applyFilter.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    });
  }
}
