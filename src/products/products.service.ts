import { Injectable, Logger } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}
  private readonly logger = new Logger(ProductsService.name);

  async create(createProductDto: CreateProductDto) {
    try {
      return await this.prisma.product.create({
        data: createProductDto,
      });
    } catch (error) {
      this.logger.error('Error creating product:', error);
      throw new Error('Failed to create product');
    }
  }

  async findAll() {
    try {
      return await this.prisma.product.findMany();
    } catch (error) {
      this.logger.error('Error fetching products:', error);
      throw new Error('Failed to fetch products');
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.product.findUnique({
        where: { id },
      });
    } catch (error) {
      this.logger.error(`Error fetching product with id ${id}:`, error);
      throw new Error(`Failed to fetch product with id ${id}`);
    }
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    try {
      return await this.prisma.product.update({
        where: { id },
        data: updateProductDto,
      });
    } catch (error) {
      this.logger.error(`Error updating product with id ${id}:`, error);
      throw new Error(`Failed to update product with id ${id}`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.product.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(`Error deleting product with id ${id}:`, error);
      throw new Error(`Failed to delete product with id ${id}`);
    }
  }
}
