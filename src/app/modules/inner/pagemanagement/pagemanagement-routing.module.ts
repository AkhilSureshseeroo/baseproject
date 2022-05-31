import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageEditComponent } from './page-edit/page-edit.component';
import { PageListComponent } from './page-list/page-list.component';
import { PageNewComponent } from './page-new/page-new.component';

const routes: Routes = [
  {path:"",component:PageListComponent},
  {path:"page-new",component:PageNewComponent},
  {path:":id/page-edit",component:PageEditComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagemanagementRoutingModule { }
