import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientListComponent } from './client-list/client-list.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { NewClientComponent } from './new-client/new-client.component';

const routes: Routes = [
  {path:"",component:ClientListComponent},
  {path:"new-client",component:NewClientComponent},
  {path:":id/edit-clients",component:EditClientComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientsRoutingModule { }
