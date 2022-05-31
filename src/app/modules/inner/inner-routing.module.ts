import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import io from 'socket.io-client';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InnerComponent } from './inner.component';

const routes: Routes = [
  {
    path: "",
    component: InnerComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
      },
      {
        path: "pagemanagement",
        loadChildren: () =>
          import("./pagemanagement/pagemanagement.module").then(
            (m) => m.PagemanagementModule
          ),
      },








    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InnerRoutingModule { }
