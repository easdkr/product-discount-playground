import { Injectable } from '@nestjs/common';
import { DiscountPolicy } from '../entity/discount-policy';
import { Maybe } from '../../../libs/functional';

@Injectable()
export abstract class DiscountPolicyRepository {
  abstract findOne(id: number): Promise<Maybe<DiscountPolicy>>;
}
