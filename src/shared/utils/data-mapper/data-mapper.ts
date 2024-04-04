import { AccountRole } from 'modules/account/types/account-role.type';
import { transformDto } from 'shared/validators/transform-dto';

export function generateOutputDto<T>(dto: new (...args: any[])=> T, data: any, group?: AccountRole): T {
  return transformDto(dto, data, group);
}
