import { environment } from '../../../../environments/environment';

export const ContactsAPI = {
  createContact(): string {
    return `${environment.apiUrl}contactus`;
  },
  getContacts():string{
      return `${environment.apiUrl}contactus`;
  },
  deletecontact(_id:number):string{
    return `${environment.apiUrl}contactus/${_id}`;
  },
  getcontactdetails(_id:number):string{
    return `${environment.apiUrl}contactus/id/${_id}`;

  },
  editcontact(_id:number):string{
    return `${environment.apiUrl}contactus/${_id}`;
  }
};

