import { Module } from '@nestjs/common';
import { CompaniesProductsService } from './companies-products.service';
import { CompaniesProductsController } from './companies-products.controller';

@Module({
  controllers: [CompaniesProductsController],
  providers: [CompaniesProductsService],
})
export class CompaniesProductsModule {}
