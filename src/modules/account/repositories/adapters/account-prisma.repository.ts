import { Prisma, PrismaClient } from '@prisma/client';
import { inject, injectable } from 'inversify';
import { Account } from 'modules/account/entities/account.entity';
import { TOKENS } from 'shared/ioc/token';
import { IAccountRepository } from '../account-repository.interface';

@injectable()
export class AccountPrismaAdapterRepository implements IAccountRepository {
  constructor(
    @inject(TOKENS.Database) private prisma: PrismaClient,
  ) {}

  public async findAllPaginated(page: number, size: number, search?: string): Promise<[Account[], number]> {
    const where: Prisma.AccountWhereInput = {
      AND: [
        {
          OR: [
            { name: { contains: search } },
            { email: { contains: search } },
          ],
        },
      ],
    };

    return this.prisma.$transaction([
      this.prisma.account.findMany({
        where,
        skip: ((page - 1) * size),
        take: size,
      }),
      this.prisma.account.count({ where }),
    ]);
  }

  public async findAll(search?: string): Promise<[Account[], number]> {
    const where: Prisma.AccountWhereInput = {
      AND: [
        {
          OR: [
            { name: { contains: search } },
            { email: { contains: search } },
          ],
        },
      ],
    };

    const accounts = await this.prisma.account.findMany({ where });

    return [accounts, accounts.length];
  }

  public async findById(id: string): Promise<Account|null> {
    return this.prisma.account.findUnique({
      where: { id },
    });
  }

  public async findByEmail(email: string): Promise<Account|null> {
    return this.prisma.account.findUnique({
      where: { email },
    });
  }

  public async save(data: Prisma.AccountCreateInput): Promise<Account> {
    return this.prisma.account.create({
      data,
    });
  }
}
