import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesProductsService } from '../companies-products.service';
import { PrismaService } from '../../database/prisma.service';

describe('CompaniesProductsService', () => {
  let service: CompaniesProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompaniesProductsService,
        { provide: PrismaService, useValue: {} },
      ],
    }).compile();

    service = module.get<CompaniesProductsService>(CompaniesProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
