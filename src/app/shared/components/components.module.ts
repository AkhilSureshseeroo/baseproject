import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../modules/material.module';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { MessageModalComponent } from './message-modal/message-modal.component';

const ownComponents = [SidebarComponent, HeaderComponent];
@NgModule({
  declarations: [
    ownComponents,
    ConfirmModalComponent,
    MessageModalComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule
  ],
  exports:ownComponents,
})
export class ComponentsModule { }
