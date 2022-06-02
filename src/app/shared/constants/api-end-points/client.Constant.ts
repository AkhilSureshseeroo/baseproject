import { environment } from '../../../../environments/environment';

export const ClientsAPI = {
  createClient(): string {
    return `${environment.apiUrl}clientlist`;
  },
  getClients():string{
      return `${environment.apiUrl}clientlist`;
  },
  deleteclient(_id:number):string{
    return `${environment.apiUrl}clientlisting/${_id}`;
  },
  getclientdetails(_id:number):string{
    return `${environment.apiUrl}clientlisting/id/${_id}`;

  },
  editclient(_id:number):string{
    return `${environment.apiUrl}clientlisting/${_id}`;
  }
};

