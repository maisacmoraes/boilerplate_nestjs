import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CompaniesProductsService } from './companies-products.service';
import { CreateCompaniesProductDto } from './dto/create-companies-product.dto';
import { UpdateCompaniesProductDto } from './dto/update-companies-product.dto';

@Controller('companies-products')
export class CompaniesProductsController {
  constructor(
    private readonly companiesProductsService: CompaniesProductsService
  ) {}

  @Post()
  async create(@Body() createCompaniesProductDto: CreateCompaniesProductDto) {
    return await this.companiesProductsService.create(
      createCompaniesProductDto
    );
  }

  @Get()
  async findAll() {
    return await this.companiesProductsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.companiesProductsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCompaniesProductDto: UpdateCompaniesProductDto
  ) {
    return await this.companiesProductsService.update(
      +id,
      updateCompaniesProductDto
    );
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.companiesProductsService.remove(+id);
  }
}
