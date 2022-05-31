import { environment } from '../../../../environments/environment';

export const ServicemanagementAPI = {
  createService(): string {
    return `${environment.apiUrl}service`;
  },
  getPages():string{
      return `${environment.apiUrl}service/getpage`;
  },
  deletePage(_id:number):string{
    return `${environment.apiUrl}pages/${_id}`;
  },
  getservicedetails(_id:number):string{
    return `${environment.apiUrl}pages/id/${_id}`;

  },
  editservice(_id:number):string{
    return `${environment.apiUrl}pages/${_id}`;
  }
};

