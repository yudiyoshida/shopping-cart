import { Expose } from 'class-transformer';

export class CreateAccountOutputDto {
  @Expose()
  id!: string;
}
