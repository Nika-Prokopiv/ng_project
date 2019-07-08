import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';
import * as moment from 'moment';
import {CategoriesService} from '../shared/services/categories.service';
import {EventService} from '../shared/services/event.service';
import {Category} from '../shared/category.model';
import {RecordsEvent} from '../shared/event.model';

@Component({
  selector: 'hm-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  isLoaded = false;
  isFilterShown = false;
  sub: Subscription;

  chartData = [];
  categories: Category[] = [];
  records: RecordsEvent[] = [];
  filteredRecords: RecordsEvent[] = [];

  constructor(private catService: CategoriesService,
              private eventService: EventService) {
  }

  ngOnInit() {
    this.sub = combineLatest([
      this.catService.getCategories(),
      this.eventService.getEvents()
    ]).subscribe((data: [Category[], RecordsEvent[]]) => {
        this.categories = data[0];
        this.records = data[1];
        this.setInitialRecords();
        this.calcChartData();
        this.isLoaded = true;
      }
    );
  }

  calcChartData() {
    this.chartData = [];
    this.categories.forEach((c) => {
      const cEvents = this.filteredRecords.filter((e) => e.category === c.id && e.type === 'outcome');
      this.chartData.push({
          name: c.name,
          value: cEvents.reduce((total, e) => {
            return total += e.amount;
          }, 0)
        }
      );
    });

  }

  private setInitialRecords() {
    this.filteredRecords = this.records.slice();
  }

  private toggleFilter(direction: boolean) {
    this.isFilterShown = direction;
  }

  openFilter() {
    this.toggleFilter(true);
  }

  onFilterApply(filterParams) {
    this.toggleFilter(false);
    this.setInitialRecords();
    // const startPeriod = moment().startOf('month');
    const startPeriod = moment().startOf(filterParams.period).startOf('day');
    // const endPeriod = moment().endOf('year');
    const endPeriod = moment().endOf(filterParams.period).endOf('day');
    console.log(filterParams);
    console.log(this.filteredRecords);
    this.filteredRecords = this.filteredRecords.filter(
      (e) => {
        return filterParams.types.includes(e.type);
      }
    ).filter((e) => {
        return filterParams.categories.includes(e.category.toString());
      }
    )
      .filter(
        (e) => {
          const momentDate = moment(e.date);
          return momentDate.isBetween(startPeriod, endPeriod);
        }
      )
    ;
    this.calcChartData();
    console.log(this.filteredRecords);
  }

  onFilterCancel(event) {
    this.toggleFilter(false);
    this.setInitialRecords();
    this.calcChartData();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
