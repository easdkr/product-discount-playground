import { Product } from '../../../productV1/core/entity';

export class CreateProductResponse {
  public id: number;

  public static from(product: Product): CreateProductResponse {
    const response = new CreateProductResponse();
    response.id = product.id;

    return response;
  }
}
