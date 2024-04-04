import jwt from 'jsonwebtoken';

import { injectable } from 'inversify';
import { IPayload } from 'modules/auth/interfaces/payload.interface';
import { IAuthenticationService } from '../authentication-service.interface';

@injectable()
export class AuthenticationJwtAdapterService implements IAuthenticationService {
  public sign(payload: IPayload): string {
    return jwt.sign(payload, process.env.JWT_SECRET as string);
  }

  public verify(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET as string);
  }
}
