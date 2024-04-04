import { AppException } from 'errors/app-exception';
import { Errors } from 'errors/error-messages';
import { NextFunction, Request, Response } from 'express';
import { container } from 'shared/ioc/inversify.config';
import { AuthenticationGuard, PermissionEnum } from '../guards/authentication.guard';

export function RequiredPermission(permission: PermissionEnum) {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function(req: Request, res: Response, next: NextFunction) {
      const guard = container.resolve(AuthenticationGuard);

      const payload = guard.getPayload(req.headers?.authorization);
      if (!payload) {
        throw new AppException(401, Errors.UNATHORIZED);
      }

      const account = await guard.getAccount(payload.sub);
      if (!account) {
        throw new AppException(401, Errors.UNATHORIZED);
      }

      const hasPermission = guard.hasPermission(account.role, permission);
      if (!hasPermission) {
        throw new AppException(403, Errors.FORBIDDEN);
      }

      req.auth = account;
      return await originalMethod.call(this, req, res, next);
    };

    return descriptor;
  };
}
