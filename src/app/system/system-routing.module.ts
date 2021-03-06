import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SystemComponent} from './system.component';
import {BillPageComponent} from './bill-page/bill-page.component';
import {HistoryPageComponent} from './history-page/history-page.component';
import {RecordsPageComponent} from './records-page/records-page.component';
import {PlanPageComponent} from './plan-page/plan-page.component';
import {HistoryDetailComponent} from './history-page/history-detail/history-detail.component';
import {AuthGuard} from '../shared/services/auth.guard';
import {AnimationsPageComponent} from './animations-page/animations-page.component';

const routes: Routes = [
  {
    path: '', component: SystemComponent, canActivate: [AuthGuard], children: [
      {path: 'bill', component: BillPageComponent},
      {path: 'history', component: HistoryPageComponent},
      {path: 'plan', component: PlanPageComponent},
      {path: 'animations', component: AnimationsPageComponent},
      {path: 'records', component: RecordsPageComponent},
      {path: 'history/:id', component: HistoryDetailComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SystemRoutingModule {
}

