import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CompaniesModule } from './companies/companies.module';
import { ProductsModule } from './products/products.module';
import { CompaniesProductsModule } from './companies-products/companies-products.module';

@Module({
  imports: [CompaniesModule, ProductsModule, CompaniesProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
