import { environment } from '../../../../environments/environment';

export const ServicemanagementAPI = {
  createService(): string {
    return `${environment.apiUrl}service`;
  },
  getServices():string{
      return `${environment.apiUrl}service`;
  },
  deleteservice(_id:number):string{
    return `${environment.apiUrl}service/${_id}`;
  },
  getservicedetails(_id:number):string{
    return `${environment.apiUrl}service/id/${_id}`;

  },
  editservice(_id:number):string{
    return `${environment.apiUrl}service/${_id}`;
  }
};

