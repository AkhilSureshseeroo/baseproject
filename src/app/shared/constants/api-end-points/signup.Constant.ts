import { environment } from '../../../../environments/environment';

export const SignUpAPI = {
  signup(): string {
    return `${environment.apiUrl}signup`;
  },
};
