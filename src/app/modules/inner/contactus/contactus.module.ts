import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContactusRoutingModule } from './contactus-routing.module';
import { NewContactComponent } from './new-contact/new-contact.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';


@NgModule({
  declarations: [
    NewContactComponent,
    ContactListComponent,
    EditContactComponent
  ],
  imports: [
    CommonModule,
    ContactusRoutingModule,
    SharedModule
  ]
})
export class ContactusModule { }
