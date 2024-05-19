import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Product } from '../core/entity/product';
import { DiscountPolicy } from '../core/entity/discount-policy';
import { ProductRepository } from '../core/repository';
import { Maybe } from '../.../../../libs/functional';

@Injectable()
export class PrismaProductRepository extends ProductRepository {
  public constructor(private readonly prisma: PrismaService) {
    super();
  }

  public async create(product: Product): Promise<Product> {
    return await this.prisma.product
      .create({
        data: {
          name: product.name,
          price: product.price,
          discountPolicyId: product.discountPolicy.id,
        },
        include: {
          discountPolicy: true,
        },
      })
      .then((product) =>
        Product.from({
          id: product.id,
          name: product.name,
          price: product.price,
          discountPolicy: DiscountPolicy.from(product.discountPolicy),
        }),
      );
  }

  public async findOne(id: number): Promise<Maybe<Product>> {
    return await this.prisma.product
      .findFirst({
        where: { id },
        include: {
          discountPolicy: true,
        },
      })
      .then((product) =>
        product
          ? Maybe.of(
              Product.from({
                id: product.id,
                name: product.name,
                price: product.price,
                discountPolicy: DiscountPolicy.from(product.discountPolicy),
              }),
            )
          : Maybe.nothing(),
      );
  }
}
