import { Injectable, Logger } from '@nestjs/common';
import { CreateCompaniesProductDto } from './dto/create-companies-product.dto';
import { UpdateCompaniesProductDto } from './dto/update-companies-product.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class CompaniesProductsService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(CompaniesProductsService.name);
  async create(
    createCompaniesProductDto: CreateCompaniesProductDto
  ): Promise<CreateCompaniesProductDto> {
    try {
      return await this.prisma.company_Product.create({
        data: createCompaniesProductDto,
      });
    } catch (error) {
      this.logger.error('Error creating companies-product:', error);
      throw new Error('Failed to create companies-product');
    }
  }

  async findAll(): Promise<CreateCompaniesProductDto[]> {
    try {
      return await this.prisma.company_Product.findMany({
        include: {
          company: {
            select: {
              id: true,
              name: true,
            },
          },
          product: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    } catch (error) {
      this.logger.error('Error fetching companies-products:', error);
      throw new Error('Failed to fetch companies-products');
    }
  }

  async findOne(id: number): Promise<CreateCompaniesProductDto | null> {
    try {
      return await this.prisma.company_Product.findUnique({
        where: { id },
        include: {
          company: {
            select: {
              id: true,
              name: true,
            },
          },
          product: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    } catch (error) {
      this.logger.error(
        `Error fetching companies-product with id ${id}:`,
        error
      );
      throw new Error(`Failed to fetch companies-product with id ${id}`);
    }
  }

  async update(
    id: number,
    updateCompaniesProductDto: UpdateCompaniesProductDto
  ) {
    try {
      return await this.prisma.company_Product.update({
        where: { id },
        data: updateCompaniesProductDto,
      });
    } catch (error) {
      this.logger.error(
        `Error updating companies-product with id ${id}:`,
        error
      );
      throw new Error(`Failed to update companies-product with id ${id}`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.company_Product.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(
        `Error deleting companies-product with id ${id}:`,
        error
      );
      throw new Error(`Failed to delete companies-product with id ${id}`);
    }
  }
}
