import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {MomentPipe} from './shared/pipes/moment.pipe';

import {SharedModule} from '../shared/shared.module';
import {SystemRoutingModule} from './system-routing.module';
import {SystemComponent} from './system.component';
import { BillPageComponent } from './bill-page/bill-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { PlanPageComponent } from './plan-page/plan-page.component';
import { RecordsPageComponent } from './records-page/records-page.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { BillCardComponent } from './bill-page/bill-card/bill-card.component';
import { CurrencyCardComponent } from './bill-page/currency-card/currency-card.component';
import { AddEventComponent } from './records-page/add-event/add-event.component';
import { AddCategoryComponent } from './records-page/add-category/add-category.component';
import { EditCategoryComponent } from './records-page/edit-category/edit-category.component';
import { HistoryChartComponent } from './history-page/history-chart/history-chart.component';
import { HistoryEventsComponent } from './history-page/history-events/history-events.component';
import { HistoryDetailComponent } from './history-page/history-detail/history-detail.component';
import { HistroryFilterComponent } from './history-page/histrory-filter/histrory-filter.component';
import { FilterPipe } from './shared/pipes/filter.pipe';

@NgModule({
  declarations: [
    SystemComponent,
    BillPageComponent,
    HistoryPageComponent,
    PlanPageComponent,
    RecordsPageComponent,
    HeaderComponent,
    SidebarComponent,
    DropdownDirective,
    BillCardComponent,
    CurrencyCardComponent,
    MomentPipe,
    AddEventComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    HistoryChartComponent,
    HistoryEventsComponent,
    HistoryDetailComponent,
    HistroryFilterComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule,
    NgxChartsModule
  ]
})

export class SystemModule {
}
