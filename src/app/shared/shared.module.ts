import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from './modules/material.module';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

const exportable = [
  CommonModule,
  MaterialModule,
  FormsModule,
  ReactiveFormsModule,
];
@NgModule({
  declarations: [],
  imports: exportable,
  exports:exportable,

})
export class SharedModule { }
