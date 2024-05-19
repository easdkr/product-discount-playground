import { Injectable } from '@nestjs/common';
import { Product } from '../core/entity/product';
import { ProductRepository } from '../core/repository';
import { Maybe } from '../../libs/functional';

@Injectable()
export class ProductService {
  public constructor(private readonly productRepository: ProductRepository) {}

  public async create(product: Product): Promise<Product> {
    return await this.productRepository.create(product);
  }

  public async findOne(id: number): Promise<Maybe<Product>> {
    return await this.productRepository.findOne(id);
  }
}
