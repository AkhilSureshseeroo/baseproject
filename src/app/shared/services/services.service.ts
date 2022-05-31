import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { CommunicationService } from 'src/app/core/services/communication.service';
import { ServicemanagementAPI } from '../constants/api-end-points/services.Constant';
import { ApiResponse } from '../models/api.response.model';
import { Services } from '../models/services.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
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
  createService(model: any,session:any): Observable<ApiResponse<any>> {
    return this.communicationService.post<ApiResponse<any>>(
      ServicemanagementAPI.createService(),model,'',session,

    );
  }
  getPages(session:any): Observable<Services[]> {
    return this.communicationService.get<Services[]>(
      ServicemanagementAPI.getPages(),'',session
    );

  }
  deletepage(_id:any,session:any):Observable<Services>{
    return this.communicationService.delete<Services>(
      ServicemanagementAPI.deletePage(_id),'',session
    )
  }
  getServiceDetails(_id: any,session:any): Observable<Services> {
    return this.communicationService.get<Services>(
    ServicemanagementAPI.getservicedetails(_id),'',session
    );
  }
  editService(_id:any,model:any,session:any): Observable <ApiResponse<any>>{
    return this.communicationService.put<ApiResponse<any>>(
      ServicemanagementAPI.editservice(_id),model,'',session

    );
  }


}


