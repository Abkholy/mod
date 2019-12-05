import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AttTableControlComponent } from '../att-table-control/att-table-control.component';
import { pages } from 'src/app/shared/pages';
import { AllAttTablesComponent } from '../all-att-tables/all-att-tables.component';
import { AttTableComponent } from '../att-table/att-table.component';

const routes: Routes = [
  {
    path: '',
    component: AttTableComponent,
    children: [
      {
        path: '',
        component: AllAttTablesComponent,
      },
      {
        path: pages.attTable.all.path,
        component: AllAttTablesComponent
      },
      {
        path: pages.attTable.add.path,
        component: AttTableControlComponent
      },
      {
        path: pages.attTable.edit.path,
        component: AttTableControlComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttTableRoutingModule { }
