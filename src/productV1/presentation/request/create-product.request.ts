import { Exclude, Expose } from 'class-transformer';
import { IsInt, IsString, Length, Max, Min } from 'class-validator';
import { DiscountPolicy, Product } from '../../core/entity';

export class CreateProductBody {
  @Expose()
  @IsString()
  @Length(1, 255)
  public name: string;

  @Expose()
  @IsInt()
  @Min(0)
  @Max(Number.MAX_SAFE_INTEGER)
  public price: number;

  @Expose()
  @IsInt()
  @Min(1)
  @Max(Number.MAX_SAFE_INTEGER)
  public discountPolicyId: number;

  @Exclude()
  private discountPolicy: DiscountPolicy;

  @Exclude()
  public setDiscountPolicy(discountPolicy: DiscountPolicy): this {
    this.discountPolicy = discountPolicy;
    return this;
  }

  @Exclude()
  public toEntity(): Product {
    return Product.of({
      name: this.name,
      price: this.price,
      discountPolicy: this.discountPolicy,
    });
  }
}
