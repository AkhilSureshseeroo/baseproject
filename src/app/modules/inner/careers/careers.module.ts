import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CareersRoutingModule } from './careers-routing.module';
import { CareerListComponent } from './career-list/career-list.component';
import { NewCareerComponent } from './new-career/new-career.component';
import { EditCareerComponent } from './edit-career/edit-career.component';


@NgModule({
  declarations: [
    CareerListComponent,
    NewCareerComponent,
    EditCareerComponent
  ],
  imports: [
    CommonModule,
    CareersRoutingModule,
    SharedModule
  ]
})
export class CareersModule { }
