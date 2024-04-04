import { PrismaClient } from '@prisma/client';
import { ContainerModule } from 'inversify';
import { TOKENS } from 'shared/ioc/token';

const prismaClient = new PrismaClient({
  errorFormat: 'minimal',
});

const prismaContainer = new ContainerModule((bind) => {
  bind<PrismaClient>(TOKENS.Database).toConstantValue(prismaClient);
});

export { prismaContainer };
