import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommunicationService } from 'src/app/core/services/communication.service';
import { ClientsAPI } from '../constants/api-end-points/client.Constant';
import { ApiResponse } from '../models/api.response.model';

import { Clients } from '../models/clients.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private _authenticated: boolean = false;

set userId(id: string) {
    localStorage.setItem("userId", id);
  }

  get userId(): string {
    return localStorage.getItem("userId") ?? "";
  }

  set email(id: string) {
    localStorage.setItem("email", id);
  }

  get email(): string {
    return localStorage.getItem("email") ?? "";
  }

  constructor(
    private communicationService: CommunicationService
  ) { }
  createClient(model: any,session:any): Observable<ApiResponse<any>> {
    return this.communicationService.post<ApiResponse<any>>(
      ClientsAPI.createClient(),model,'',session,

    );
  }
  getClients(session:any): Observable<Clients[]> {
    return this.communicationService.get<Clients[]>(
      ClientsAPI.getClients(),'',session
    );

  }
  deleteclient(_id:any,session:any):Observable<Clients>{
    return this.communicationService.delete<Clients>(
      ClientsAPI.deleteclient(_id),'',session
    )
  }
  getClientDetails(_id: any,session:any): Observable<Clients> {
    return this.communicationService.get<Clients>(
    ClientsAPI.getclientdetails(_id),'',session
    );
  }
  editclient(_id:any,model:any,session:any): Observable <ApiResponse<any>>{
    return this.communicationService.put<ApiResponse<any>>(
      ClientsAPI.editclient(_id),model,'',session

    );
  }
}
