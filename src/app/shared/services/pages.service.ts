import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { PagemanagementAPI } from '../constants/api-end-points/pages.Constant';
import { ApiResponse } from '../models/api.response.model';
import { CommunicationService } from 'src/app/core/services/communication.service';
import { throwError } from 'rxjs/internal/observable/throwError';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { of } from 'rxjs/internal/observable/of';
import { Pages } from '../models/pages.modal';
@Injectable({
  providedIn: 'root'
})
export class PagesService {
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
  createPage(model: any,session:any): Observable<ApiResponse<any>> {
    return this.communicationService.post<ApiResponse<any>>(
      PagemanagementAPI.createPage(),model,'',session,

    );
  }
  getPages(session:any): Observable<Pages[]> {
    return this.communicationService.get<Pages[]>(
      PagemanagementAPI.getPages(),'',session
    );

  }
  deletepage(_id:any,session:any):Observable<Pages>{
    return this.communicationService.delete<Pages>(
      PagemanagementAPI.deletePage(_id),session
    )
  }
  getpageDetails(_id: any,session:any): Observable<Pages> {
    return this.communicationService.get<Pages>(
    PagemanagementAPI.getpagedetails(_id),'',session
    );
  }
  editPage(_id:any,model:any,session:any): Observable <ApiResponse<any>>{
    return this.communicationService.put<ApiResponse<any>>(
      PagemanagementAPI.editpage(_id),model,'',session

    );
  }


}

