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
      {
        path: "servicemanagement",
        loadChildren: () =>
          import("./servicemanagement/servicemanagement.module").then(
            (m) => m.ServicemanagementModule
          ),
      },
      {
        path: "careers",
        loadChildren: () =>
          import("./careers/careers.module").then(
            (m) => m.CareersModule
          ),
      },
      {
        path: "clients",
        loadChildren: () =>
          import("./clients/clients.module").then(
            (m) => m.ClientsModule
          ),
      },
      {
        path: "contactus",
        loadChildren: () =>
          import("./contactus/contactus.module").then(
            (m) => m.ContactusModule
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
