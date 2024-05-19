import { Injectable } from '@nestjs/common';
import { DiscountPolicyRepository } from '../core/repository';
import { Maybe } from '../../libs/functional';
import { DiscountPolicy } from '../core/entity';

@Injectable()
export class DiscountPolicyService {
  public constructor(
    private readonly discountPolicyRepository: DiscountPolicyRepository,
  ) {}

  public async findOne(id: number): Promise<Maybe<DiscountPolicy>> {
    return await this.discountPolicyRepository.findOne(id);
  }
}
