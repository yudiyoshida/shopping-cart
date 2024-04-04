import { injectable } from 'inversify';
import { Faq } from 'modules/faq/entities/faq.entity';
import { generateIdWithLength } from 'shared/utils/id-generator/id-generator';
import { CreateFaqDto, IFaqRepository, UpdateFaqDto } from '../faq-repository.interface';

@injectable()
export class FaqInMemoryAdapterRepository implements IFaqRepository {
  private _faqs: Faq[] = [];

  public async findAllPaginated(page: number, size: number, search?: string): Promise<[Faq[], number]> {
    const take = size;
    const skip = ((page - 1) * size);

    const faqsFiltered = this._faqs.filter(item => item.question.includes(search ?? ''));
    const faqsPaginated = faqsFiltered.slice(skip, skip + take);

    return [faqsPaginated, faqsFiltered.length] as [Faq[], number];
  }

  public async findAll(search?: string | undefined): Promise<[Faq[], number]> {
    const faqs = this._faqs.filter(item => item.question.includes(search ?? ''));

    return [faqs, faqs.length] as [Faq[], number];
  }


  public async findById(id: string): Promise<Faq | null> {
    const faq = this._faqs.find(item => item.id == id);

    return faq ?? null;
  }

  public async create(data: CreateFaqDto): Promise<Faq> {
    const id = generateIdWithLength(24);
    const newFaq = { ...data, id };

    this._faqs.push(newFaq);

    return newFaq;
  }

  public async update(id: string, data: UpdateFaqDto): Promise<void> {
    const faqIndex = this._faqs.findIndex(item => item.id == id);

    this._faqs[faqIndex] = { ...this._faqs[faqIndex], ...data, id };
  }

  public async delete(id: string): Promise<void> {
    this._faqs = this._faqs.filter(item => item.id != id);
  }
}
