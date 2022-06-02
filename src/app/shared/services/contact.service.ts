import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommunicationService } from 'src/app/core/services/communication.service';
import { ContactsAPI } from '../constants/api-end-points/contacts.Constant';
import { ApiResponse } from '../models/api.response.model';
import { Contacts } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
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
  createContact(model: any,session:any): Observable<ApiResponse<any>> {
    return this.communicationService.post<ApiResponse<any>>(
      ContactsAPI.createContact(),model,'',session,

    );
  }
  getContacts(session:any): Observable<Contacts[]> {
    return this.communicationService.get<Contacts[]>(
      ContactsAPI.getContacts(),'',session
    );

  }
  deletecontact(_id:any,session:any):Observable<Contacts>{
    return this.communicationService.delete<Contacts>(
      ContactsAPI.deletecontact(_id),'',session
    )
  }
  getContactDetails(_id: any,session:any): Observable<Contacts> {
    return this.communicationService.get<Contacts>(
    ContactsAPI.getcontactdetails(_id),'',session
    );
  }
  editcontact(_id:any,model:any,session:any): Observable <ApiResponse<any>>{
    return this.communicationService.put<ApiResponse<any>>(
      ContactsAPI.editcontact(_id),model,'',session

    );
  }
}
