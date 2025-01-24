/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { identifiers } =
      await this.productRepository.insert(createProductDto);
    return identifiers[0];
  }

  async findAll({
    page,
    pageSize,
    sort,
    price,
  }: {
    page: number | undefined;
    pageSize: number | undefined;
    sort: string | undefined;
    price: number | undefined;
  }) {
    const take = pageSize || 10;
    const [products, count] = await Promise.all([
      this.productRepository.find({
        skip: ((page || 1) - 1) * take,
        take,
        order: sort ? { [sort]: 'asc' } : undefined,
        where:
          price !== undefined ? { price: MoreThanOrEqual(price) } : undefined,
      }),
      this.productRepository.count({
        where:
          price !== undefined ? { price: MoreThanOrEqual(price) } : undefined,
      }),
    ]);

    return {
      products,
      totalPages: Math.ceil(count / take),
    };
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) throw new NotFoundException(`Продукт с id ${id} на найден`);
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const { affected } = await this.productRepository.update(
      { id },
      updateProductDto,
    );
    if (affected !== 1)
      throw new NotFoundException(`Продукт с id ${id} на найден`);
  }

  async remove(id: string) {
    const { affected } = await this.productRepository.delete({ id });
    if (affected !== 1)
      throw new NotFoundException(`Продукт с id ${id} на найден`);
  }
}
