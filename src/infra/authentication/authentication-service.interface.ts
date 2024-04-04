import { IPayload } from 'modules/auth/interfaces/payload.interface';

export interface IAuthenticationService {
  sign(payload: IPayload): string;
  verify(token: string): any;
}
