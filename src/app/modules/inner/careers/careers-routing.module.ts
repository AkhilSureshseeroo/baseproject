import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CareerListComponent } from './career-list/career-list.component';
import { EditCareerComponent } from './edit-career/edit-career.component';
import { NewCareerComponent } from './new-career/new-career.component';

const routes: Routes = [
  {path:"",component:CareerListComponent},
  {path:"new-career",component:NewCareerComponent},
  {path:":id/edit-career",component:EditCareerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CareersRoutingModule { }
