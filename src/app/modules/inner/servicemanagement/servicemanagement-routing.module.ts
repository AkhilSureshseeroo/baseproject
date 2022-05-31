import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditserviceComponent } from './editservice/editservice.component';
import { NewserviceComponent } from './newservice/newservice.component';
import { ServicelistComponent } from './servicelist/servicelist.component';

const routes: Routes = [
  {path:"",component:ServicelistComponent},
  {path:"new-service",component:NewserviceComponent},
  {path:":id/edit-service",component:EditserviceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServicemanagementRoutingModule { }
