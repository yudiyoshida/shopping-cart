import { Faq } from '../entities/faq.entity';

export interface IFaqRepository {
  findAll(search?: string): Promise<[Faq[], number]>;
  findAllPaginated(page: number, size: number, search?: string): Promise<[Faq[], number]>;
  findById(id: string): Promise<Faq|null>;
  create(data: CreateFaqDto): Promise<Faq>;
  create(data: CreateFaqDto): Promise<Faq>;
  update(id: string, data: UpdateFaqDto): Promise<void>;
  delete(id: string): Promise<void>;
}

export class CreateFaqDto implements Omit<Faq, 'id'> {
  question!: string;
  answer!: string;
}

export class UpdateFaqDto implements Omit<Faq, 'id'> {
  question!: string;
  answer!: string;
}
