import { Maybe } from '../../../libs/functional';
import { Product } from '../entity/product';

export abstract class ProductRepository {
  abstract create(product: Product): Promise<Product>;
  abstract findOne(id: number): Promise<Maybe<Product>>;
}
