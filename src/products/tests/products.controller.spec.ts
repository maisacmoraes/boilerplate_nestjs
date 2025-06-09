import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../products.controller';
import { ProductsService } from '../products.service';
import { PrismaService } from '../../database/prisma.service';
import { mockProduct } from './mocks';

describe('ProductsController', () => {
  let controller: ProductsController;
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockProduct),
            findAll: jest.fn().mockResolvedValue([mockProduct]),
            findOne: jest.fn().mockResolvedValue(mockProduct),
            update: jest.fn().mockResolvedValue(mockProduct),
            remove: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
        { provide: PrismaService, useValue: {} },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call productsService.create with correct params and return result', async () => {
      const companyId = '1';
      const price = { value: '10.00' } as any;

      const response = await controller.create(companyId, price, mockProduct);

      expect(productsService.create).toHaveBeenCalledWith(
        +companyId,
        price,
        mockProduct
      );
      expect(response).toBe(mockProduct);
    });
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      await controller.findAll();
      expect(await controller.findAll()).toStrictEqual([mockProduct]);
      expect(productsService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a product by id', async () => {
      const id = '1';

      expect(await controller.findOne(id)).toBe(mockProduct);
      expect(productsService.findOne).toHaveBeenCalledWith(+id);
    });
  });

  describe('update', () => {
    it('should update a product and return the updated product', async () => {
      const id = '1';

      expect(await controller.update(id, mockProduct)).toBe(mockProduct);
      expect(productsService.update).toHaveBeenCalledWith(+id, mockProduct);
    });
  });

  describe('remove', () => {
    it('should remove a product and return the result', async () => {
      const id = '1';
      const result = { deleted: true };

      expect(await controller.remove(id)).toStrictEqual(result);
      expect(productsService.remove).toHaveBeenCalledWith(+id);
    });
  });
});
