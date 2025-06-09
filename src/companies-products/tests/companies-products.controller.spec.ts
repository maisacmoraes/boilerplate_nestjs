import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesProductsController } from '../companies-products.controller';
import { CompaniesProductsService } from '../companies-products.service';
import { PrismaService } from '../../database/prisma.service';

describe('CompaniesProductsController', () => {
  let controller: CompaniesProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesProductsController],
      providers: [
        CompaniesProductsService,
        { provide: PrismaService, useValue: {} },
      ],
    }).compile();

    controller = module.get<CompaniesProductsController>(
      CompaniesProductsController
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
