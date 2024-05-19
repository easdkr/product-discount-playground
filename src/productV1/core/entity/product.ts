import { DiscountPolicy } from './discount-policy';

export class Product {
  private constructor(
    private _name: string,
    private _price: number,
    private _discountPolicy: DiscountPolicy,
    private _id?: number,
  ) {}

  public get id(): number {
    if (!this._id) throw new Error('아직 존재하지 않는 product 입니다.');

    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get price(): number {
    return this._price;
  }

  public setPrice(price: number): void {
    this._price = price;
  }

  public get discountPolicy(): DiscountPolicy {
    return this._discountPolicy;
  }

  public static from(data: {
    id: number;
    name: string;
    price: number;
    discountPolicy: DiscountPolicy;
  }): Product {
    return new Product(data.name, data.price, data.discountPolicy, data.id);
  }

  public static of(data: {
    name: string;
    price: number;
    discountPolicy: DiscountPolicy;
  }): Product {
    return new Product(data.name, data.price, data.discountPolicy);
  }
}
