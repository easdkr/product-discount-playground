import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import {
  DiscountPolicyService,
  PriceCalculator,
  ProductService,
} from '../usecase';
import { CreateProductBody } from './request';
import { CreateProductResponse, FindOneProductResponse } from './response';

@Controller({ path: 'product', version: '1' })
export class ProductControllerV1 {
  public constructor(
    private readonly productService: ProductService,
    private readonly discountPolicyService: DiscountPolicyService,
    private readonly priceCalculator: PriceCalculator,
  ) {}

  @Post()
  public async create(
    @Body() body: CreateProductBody,
  ): Promise<CreateProductResponse> {
    const discountPolicy = await this.discountPolicyService
      .findOne(body.discountPolicyId)
      .then((maybe) =>
        maybe.getOrThrow(
          new NotFoundException('할인 정책을 찾을 수 없습니다.'),
        ),
      );

    const product = await this.productService.create(
      body.setDiscountPolicy(discountPolicy).toEntity(),
    );

    return CreateProductResponse.from(product);
  }

  @Get(':id')
  public async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<FindOneProductResponse> {
    const product = await this.productService
      .findOne(id)
      .then((maybe) =>
        maybe.getOrThrow(new NotFoundException('상품을 찾을 수 없습니다.')),
      );

    return FindOneProductResponse.from(
      product,
      this.priceCalculator.create(product).calculate(product),
    );
  }
}
