import {Component, Input, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import * as moment from 'moment';

import {Category} from '../../shared/category.model';
import {EventService} from '../../shared/services/event.service';
import {RecordsEvent} from '../../shared/event.model';
import {BillService} from '../../shared/services/bill.service';
import {Bill} from '../../shared/bill.model';
import {Message} from '../../../shared/models/message.model';

@Component({
  selector: 'hm-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  @Input() categories: Category[];
  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'},
  ];

  message: Message = {
    type: 'error',
    text: ''
  };

  event: RecordsEvent;

  currentCategoryId = 1;

  constructor(private eventService: EventService,
              private billService: BillService) {
  }

  ngOnInit() {
  }

  postForm(form: NgForm) {
    let {type, amount, category, description} = form.value;
    if (amount < 0) {
      return amount *= -1;
    }
    this.event = {type: type, amount: amount, category: +category, date: moment().format('DD.MM.YYYY HH:mm:ss'), description: description};
    console.log(this.event);

    this.billService.getBill().subscribe(
      (bill: Bill) => {
        let val = 0;
        if (type === 'outcome') {
          if (amount > bill.value) {
            this.message.text = 'не хвататет денег';
            setTimeout(
              () => {
                this.message.text = '';
              }, 3000
            );
            return;
          } else {
            val = bill.value - amount;
          }
        } else {
          val = bill.value + amount;
        }
        this.billService.updateBill({value: val, currency: 'RUB'})
          .subscribe(
            () => {
              this.eventService.addEvent(this.event).subscribe();
              form.setValue({
                type: 'outcome',
                amount: 0,
                category: 1,
                description: ' '
              });
            }
          );
      }
    );
    // this.eventService.addEvent(this.event).subscribe(
    //   (res) => console.log(res)
    // );
  }

}
