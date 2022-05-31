import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { InnerRoutingModule } from './inner-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InnerComponent } from './inner.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';


@NgModule({
  declarations: [
    DashboardComponent,
    InnerComponent,

  ],
  imports: [
    CommonModule,
    InnerRoutingModule,
    SharedModule,
    ComponentsModule
  ]
})
export class InnerModule { }
