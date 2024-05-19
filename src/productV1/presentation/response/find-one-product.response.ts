import { Product } from 'src/productV1/core/entity';

export class FindOneProductResponse {
  public id: number;
  public name: string;
  public price: number;
  public discountPrice: number;

  public static from(
    product: Product,
    discountPrice: number,
  ): FindOneProductResponse {
    const response = new FindOneProductResponse();
    response.id = product.id;
    response.name = product.name;
    response.price = product.price;
    response.discountPrice = discountPrice;

    return response;
  }
}
