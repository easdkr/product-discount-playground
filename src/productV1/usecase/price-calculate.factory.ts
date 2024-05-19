import { Inject, Injectable } from '@nestjs/common';
import { Product } from '../core/entity/product';
import {
  DiscountCalculateStrategy,
  FixedDiscountCalculator,
  PercentDiscountCalculator,
} from '../core/strategy/discount-calculate.strategy';

@Injectable()
export class PriceCalculator {
  public constructor(
    @Inject(FixedDiscountCalculator)
    private readonly fixedDiscountCalculator: DiscountCalculateStrategy,
    @Inject(PercentDiscountCalculator)
    private readonly percentDiscountCalculator: DiscountCalculateStrategy,
  ) {}

  public create(product: Product): DiscountCalculateStrategy {
    switch (product.discountPolicy.type) {
      case 'percentage':
        return this.percentDiscountCalculator;
      case 'fixed':
        return this.fixedDiscountCalculator;
      default:
        throw new Error('지원하지 않는 할인 정책입니다.');
    }
  }
}
