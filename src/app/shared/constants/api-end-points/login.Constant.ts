import { environment } from '../../../../environments/environment';

export const LoginAPI = {
  login(): string {
    return `${environment.apiUrl}signin`;
  },
};
