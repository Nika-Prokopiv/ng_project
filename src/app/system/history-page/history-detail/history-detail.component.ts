import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {EventService} from '../../shared/services/event.service';
import {CategoriesService} from '../../shared/services/categories.service';
import {RecordsEvent} from '../../shared/event.model';
import {Category} from '../../shared/category.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'hm-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  public id: number;
  public event: RecordsEvent;
  public category: Category;

  public sub: Subscription;

  public isLoaded = false;

  constructor(private route: ActivatedRoute,
              private eventService: EventService,
              private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.sub = this.route.paramMap
      .subscribe(
        (params: ParamMap) => {
          this.id = parseFloat(params.get('id'));
          this.eventService.getEventById(this.id).subscribe(
            (event) => {
              this.event = event;
              this.categoriesService.getCategoryById(event.category).subscribe(
                (category) => {
                  this.category = category;
                  this.isLoaded = true;
                }
              );
            }
          );
        }
      );
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
      console.log('undo sub');
      this.sub = undefined;
    }
  }


//   amount: 890
//   category: 3
//   date: "30.05.2019 16:49:10"
//   description: "корм акана 1,8 кг"
//   id: 2​
//   type: "outcome"

}
