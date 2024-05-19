import { Module, Provider } from '@nestjs/common';
import {
  FixedDiscountCalculator,
  PercentDiscountCalculator,
} from './core/strategy';
import {
  DiscountPolicyService,
  PriceCalculator,
  ProductService,
} from './usecase';
import { ProductControllerV1 } from './presentation';
import { DiscountPolicyRepository, ProductRepository } from './core/repository';
import {
  PrismaDiscountPolicyRepository,
  PrismaProductRepository,
} from './persistence';
import { PrismaService } from '../prisma.service';

const repositories: Provider[] = [
  {
    provide: ProductRepository,
    useClass: PrismaProductRepository,
  },
  {
    provide: DiscountPolicyRepository,
    useClass: PrismaDiscountPolicyRepository,
  },
];

const services: Provider[] = [ProductService, DiscountPolicyService];

@Module({
  imports: [],
  controllers: [ProductControllerV1],
  providers: [
    PrismaService,
    ...repositories,
    ...services,
    PriceCalculator,
    FixedDiscountCalculator,
    PercentDiscountCalculator,
  ],
})
export class ProductModule {}
