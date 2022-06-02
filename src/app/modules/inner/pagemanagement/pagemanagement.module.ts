import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { PagemanagementRoutingModule } from './pagemanagement-routing.module';
import { PageNewComponent } from './page-new/page-new.component';
import { PageEditComponent } from './page-edit/page-edit.component';
import { PageListComponent } from './page-list/page-list.component';


@NgModule({
  declarations: [
    PageNewComponent,
    PageEditComponent,
    PageListComponent
  ],
  imports: [
    CommonModule,
    PagemanagementRoutingModule,
    SharedModule,
    
  ]
})
export class PagemanagementModule { }
