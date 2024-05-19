import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { DiscountPolicy } from '../core/entity';
import { DiscountPolicyRepository } from '../core/repository';
import { Maybe } from '../../libs/functional';

@Injectable()
export class PrismaDiscountPolicyRepository extends DiscountPolicyRepository {
  public constructor(private readonly prisma: PrismaService) {
    super();
  }

  public findOne(id: number): Promise<Maybe<DiscountPolicy>> {
    return this.prisma.discountPolicy
      .findFirst({ where: { id } })
      .then((discountPolicy) =>
        discountPolicy
          ? Maybe.of(
              DiscountPolicy.from({
                id: discountPolicy.id,
                type: discountPolicy.type,
                amount: discountPolicy.amount,
              }),
            )
          : Maybe.nothing(),
      );
  }
}
