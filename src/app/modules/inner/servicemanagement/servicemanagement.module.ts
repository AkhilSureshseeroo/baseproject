import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ServicemanagementRoutingModule } from './servicemanagement-routing.module';
import { NewserviceComponent } from './newservice/newservice.component';
import { ServicelistComponent } from './servicelist/servicelist.component';
import { EditserviceComponent } from './editservice/editservice.component';


@NgModule({
  declarations: [
    NewserviceComponent,
    ServicelistComponent,
    EditserviceComponent
  ],
  imports: [
    CommonModule,
    ServicemanagementRoutingModule,
    SharedModule
  ]
})
export class ServicemanagementModule { }
