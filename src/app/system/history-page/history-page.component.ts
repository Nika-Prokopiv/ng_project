import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoriesService} from '../shared/services/categories.service';
import {EventService} from '../shared/services/event.service';
import {combineLatest, Subscription} from 'rxjs';
import {Category} from '../shared/category.model';
import {RecordsEvent} from '../shared/event.model';

@Component({
  selector: 'hm-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  isLoaded = false;
  sub: Subscription;

  chartData = [];
  categories: Category[] = [];
  records: RecordsEvent[] = [];

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
        this.calcChartData();
        this.isLoaded = true;
      }
    );
  }

  calcChartData() {
    this.chartData = [];
    this.categories.forEach((c) => {
      const cEvents = this.records.filter((e) => e.category === c.id && e.type === 'outcome');
      this.chartData.push({
          name: c.name,
          value: cEvents.reduce((total, e) => {
            return total += e.amount;
          }, 0)
        }
      );
    });

  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
