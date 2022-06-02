import { environment } from '../../../../environments/environment';

export const CareersAPI = {
  createCareer(): string {
    return `${environment.apiUrl}career`;
  },
  getCareers():string{
      return `${environment.apiUrl}career`;
  },
  deletecareer(_id:number):string{
    return `${environment.apiUrl}career/${_id}`;
  },
  getcareerdetails(_id:number):string{
    return `${environment.apiUrl}career/id/${_id}`;

  },
  editcareer(_id:number):string{
    return `${environment.apiUrl}career/${_id}`;
  }
};

