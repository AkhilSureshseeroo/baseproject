import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicemanagementRoutingModule } from './servicemanagement-routing.module';
import { NewserviceComponent } from './newservice/newservice.component';


@NgModule({
  declarations: [
    NewserviceComponent
  ],
  imports: [
    CommonModule,
    ServicemanagementRoutingModule
  ]
})
export class ServicemanagementModule { }
