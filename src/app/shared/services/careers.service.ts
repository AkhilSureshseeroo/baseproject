import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommunicationService } from 'src/app/core/services/communication.service';
import { CareersAPI } from '../constants/api-end-points/careers.constant';

import { ApiResponse } from '../models/api.response.model';
import { Careers } from '../models/careers.model';

@Injectable({
  providedIn: 'root'
})
export class CareersService {
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
  createCareer(model: any,session:any): Observable<ApiResponse<any>> {
    return this.communicationService.post<ApiResponse<any>>(
      CareersAPI.createCareer(),model,'',session,

    );
  }
  getCareers(session:any): Observable<Careers[]> {
    return this.communicationService.get<Careers[]>(
      CareersAPI.getCareers(),'',session
    );

  }
  deletecareer(_id:any,session:any):Observable<Careers>{
    return this.communicationService.delete<Careers>(
      CareersAPI.deletecareer(_id),'',session
    )
  }
  getCareerDetails(_id: any,session:any): Observable<Careers> {
    return this.communicationService.get<Careers>(
    CareersAPI.getcareerdetails(_id),'',session
    );
  }
  editcareer(_id:any,model:any,session:any): Observable <ApiResponse<any>>{
    return this.communicationService.put<ApiResponse<any>>(
      CareersAPI.editcareer(_id),model,'',session

    );
  }
}
