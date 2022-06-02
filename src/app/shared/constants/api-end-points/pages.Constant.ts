import { environment } from '../../../../environments/environment';

export const PagemanagementAPI = {
  createPage(): string {
    return `${environment.apiUrl}pages`;
  },
  getPages():string{
      return `${environment.apiUrl}pages`;
  },
  deletePage(_id:number):string{
    return `${environment.apiUrl}pages/${_id}`;
  },
  getpagedetails(_id:number):string{
    return `${environment.apiUrl}pages/id/${_id}`;

  },
  editpage(_id:number):string{
    return `${environment.apiUrl}pages/${_id}`;
  }
};

