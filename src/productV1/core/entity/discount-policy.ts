import { DiscountPolicyType } from '../vo';

export class DiscountPolicy {
  private constructor(
    private _type: DiscountPolicyType,
    private _amount: number,
    private _id: number,
  ) {}

  public get id(): number {
    return this._id;
  }

  public get type(): DiscountPolicyType {
    return this._type;
  }

  public get amount(): number {
    return this._amount;
  }

  public static from(data: {
    id: number;
    type: string;
    amount: number;
  }): DiscountPolicy {
    if (!isDiscountPolicyType(data.type))
      throw new Error('Invalid discount policy type');

    return new DiscountPolicy(data.type, data.amount, data.id);
  }
}

function isDiscountPolicyType(type: string): type is DiscountPolicyType {
  return type === 'fixed' || type === 'percentage';
}
