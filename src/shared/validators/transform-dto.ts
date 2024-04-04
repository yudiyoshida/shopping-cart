import { ClassConstructor, ClassTransformOptions, plainToClass } from 'class-transformer';
import { AccountRole } from 'modules/account/types/account-role.type';

const options: ClassTransformOptions = {
  excludeExtraneousValues: true,
};

export function transformDto<T>(dto: ClassConstructor<T>, plain: any, group?: AccountRole): T {
  if (group) {
    options.groups = [group];
  }

  return plainToClass(dto, plain, options);
}
