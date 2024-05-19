import { Injectable } from '@nestjs/common';
import { Product } from '../entity/product';

export interface DiscountCalculateStrategy {
  calculate(product: Product): number;
}

@Injectable()
export class PercentDiscountCalculator {
  public calculate(product: Product): number {
    return product.price - product.price * product.discountPolicy.amount;
  }
}

@Injectable()
export class FixedDiscountCalculator {
  public calculate(product: Product): number {
    return product.price - product.discountPolicy.amount;
  }
}
