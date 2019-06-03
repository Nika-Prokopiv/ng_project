import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';

import {BillService} from '../shared/services/bill.service';
import {CategoriesService} from '../shared/services/categories.service';
import {EventService} from '../shared/services/event.service';
import {Bill} from '../shared/bill.model';
import {Category} from '../shared/category.model';
import {RecordsEvent} from '../shared/event.model';

@Component({
  selector: 'hm-plan-page',
  templateUrl: './plan-page.component.html',
  styleUrls: ['./plan-page.component.scss']
})
export class PlanPageComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  isLoaded = false;
  bill: Bill;
  categories: Category[] = [];
  recordEvents: RecordsEvent[] = [];

  constructor(private billService: BillService,
              private categoryService: CategoriesService,
              private eventService: EventService) {
  }

  ngOnInit() {
    this.sub1 = combineLatest([this.billService.getBill(),
      this.categoryService.getCategories(),
      this.eventService.getEvents()]
    ).subscribe(
      (data: [Bill, Category[], RecordsEvent[]]) => {
        this.bill = data[0];
        this.categories = data[1];
        this.recordEvents = data[2];
        this.isLoaded = true;
      });
  }

  getCategoryCost(category: Category): number {
    const categoryEvents = this.recordEvents.filter(
      (e: RecordsEvent) => e.category === category.id && e.type === 'outcome'
    );
    return categoryEvents.reduce((total, e) => {
      return total += e.amount;
    }, 0);
  }

  getPercent(category: Category): number {
    const outcome = this.getCategoryCost(category);
    const percent = ((outcome * 100) / category.capacity).toFixed(0);
    return +percent > 100 ? 100 : +percent <= 0 ? 0 : +percent;
  }

  getCatWidth(category: Category): string {
    const width = this.getPercent(category);
    return width + '%';
  }

  getCatColorClass(category: Category): string {
    const prc = this.getPercent(category);
    return prc < 60 ? 'success' : prc >= 100 ? 'danger' : 'warning';
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
