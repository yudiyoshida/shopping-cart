import { Container } from 'inversify';
import { TOKENS } from 'shared/ioc/token';

import { AuthenticationJwtAdapterService } from 'infra/authentication/adapters/authentication-jwt.service';
import { IAuthenticationService } from 'infra/authentication/authentication-service.interface';
import { prismaContainer } from 'infra/database/prisma/prisma.service';
import { HashingBcryptAdapterService } from 'infra/hashing/adapters/hashing-bcrypt.service';
import { IHashingService } from 'infra/hashing/hashing-service.interface';
import { IAccountRepository } from 'modules/account/repositories/account-repository.interface';
import { AccountPrismaAdapterRepository } from 'modules/account/repositories/adapters/account-prisma.repository';
import { FindAccountByEmailService } from 'modules/account/use-cases/find-by-email/find-account-by-email.service';
import { FaqPrismaAdapterRepository } from 'modules/faq/repositories/adapters/faq-prisma.repository';
import { IFaqRepository } from 'modules/faq/repositories/faq-repository.interface';
import { FindFaqByIdService } from 'modules/faq/use-cases/find-by-id/find-faq-by-id.service';
import { PaginationService } from 'shared/helpers/pagination/pagination.service';

const container = new Container({ defaultScope: 'Singleton' });

// modules
container.load(prismaContainer);

// repositories
container.bind<IAccountRepository>(TOKENS.IAccountRepository).to(AccountPrismaAdapterRepository);
container.bind<IFaqRepository>(TOKENS.IFaqRepository).to(FaqPrismaAdapterRepository);

// infra
container.bind<IAuthenticationService>(TOKENS.IAuthenticationService).to(AuthenticationJwtAdapterService);
container.bind<IHashingService>(TOKENS.IHashingService).to(HashingBcryptAdapterService);

// providers
container.bind(FindAccountByEmailService).toSelf();
container.bind(FindFaqByIdService).toSelf();
container.bind(PaginationService).toSelf();

export { container };
