import { environment } from '../../../../environments/environment';

export const ProfileAddAPI = {
  ProfileAdd(): string {
    return `${environment.apiUrl}profile`;
  },
};
export const getprofileAPI={
    getprofiledetails(_id:number):string {
        return `${environment.apiUrl}profile/${_id}`;

    }
};