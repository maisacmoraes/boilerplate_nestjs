import { Injectable, Logger } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly logger = new Logger(CompaniesService.name);

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      return await this.prisma.company.create({
        data: createCompanyDto,
      });
    } catch (error) {
      this.logger.error('Error creating company:', error);
      throw new Error('Failed to create company');
    }
  }

  async findAll() {
    try {
      return await this.prisma.company.findMany();
    } catch (error) {
      this.logger.error('Error fetching companies:', error);
      throw new Error('Failed to fetch companies');
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.company.findUnique({
        where: { id },
      });
    } catch (error) {
      this.logger.error(`Error fetching company with id ${id}:`, error);
      throw new Error(`Failed to fetch company with id ${id}`);
    }
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto) {
    try {
      return await this.prisma.company.update({
        where: { id },
        data: updateCompanyDto,
      });
    } catch (error) {
      this.logger.error(`Error updating company with id ${id}:`, error);
      throw new Error(`Failed to update company with id ${id}`);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.company.delete({
        where: { id },
      });
    } catch (error) {
      this.logger.error(`Error deleting company with id ${id}:`, error);
      throw new Error(`Failed to delete company with id ${id}`);
    }
  }
}
