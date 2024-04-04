import { Prisma, PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { Faq } from 'modules/faq/entities/faq.entity';
import { TOKENS } from 'shared/ioc/token';
import { IFaqRepository, UpdateFaqDto } from '../faq-repository.interface';

@injectable()
export class FaqPrismaAdapterRepository implements IFaqRepository {
  constructor(
    @inject(TOKENS.Database) private prisma: PrismaClient,
  ) {}

  public async findAllPaginated(page: number, size: number, search?: string): Promise<[Faq[], number]> {
    const where: Prisma.FaqWhereInput = {
      AND: [
        {
          OR: [
            { question: { contains: search } },
            { answer: { contains: search } },
          ],
        },
      ],
    };

    return this.prisma.$transaction([
      this.prisma.faq.findMany({
        where,
        skip: ((page - 1) * size),
        take: size,
      }),
      this.prisma.faq.count({ where }),
    ]);
  }

  public async findAll(search?: string | undefined): Promise<[Faq[], number]> {
    const where: Prisma.FaqWhereInput = {
      AND: [
        {
          OR: [
            { question: { contains: search } },
            { answer: { contains: search } },
          ],
        },
      ],
    };

    const faqs = await this.prisma.faq.findMany({ where });

    return [faqs, faqs.length];
  }


  public async findById(id: string): Promise<Faq | null> {
    return this.prisma.faq.findUnique({
      where: { id },
    });
  }

  public async create(data: Prisma.FaqCreateInput): Promise<Faq> {
    return this.prisma.faq.create({
      data,
    });
  }

  public async update(id: string, data: UpdateFaqDto): Promise<void> {
    await this.prisma.faq.update({
      where: { id },
      data,
    });
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.faq.delete({
      where: { id },
    });
  }
}
