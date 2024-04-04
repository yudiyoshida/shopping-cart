import { Expose } from 'class-transformer';

export class LoginOutputDto {
  @Expose()
  accessToken!: string;
}
