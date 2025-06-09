import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../products.service';
import { PrismaService } from '../../database/prisma.service';
import { mockProduct } from './mocks';

describe('ProductsService', () => {
  let service: ProductsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: PrismaService,
          useValue: {
            product: {
              create: jest.fn().mockResolvedValue(mockProduct),
              findMany: jest.fn().mockResolvedValue([mockProduct]),
              findUnique: jest.fn().mockResolvedValue(mockProduct),
              update: jest.fn().mockResolvedValue(mockProduct),
              delete: jest.fn().mockResolvedValue({ deleted: true }),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', async () => {
      const companyId = 1;
      const price = { toString: () => '100.00' } as any;

      const result = await service.create(companyId, price, mockProduct);
      expect(prisma.product.create).toHaveBeenCalledWith({
        data: {
          ...mockProduct,
          companyProduct: {
            create: {
              companyId,
              price,
            },
          },
        },
      });
      expect(result).toEqual(mockProduct);
    });

    it('should throw error if prisma throws', async () => {
      jest
        .spyOn(prisma.product, 'create')
        .mockRejectedValue(new Error('DB error'));
      await expect(service.create(1, {} as any, {} as any)).rejects.toThrow(
        'Failed to create product'
      );
    });
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      const result = await service.findAll();
      expect(prisma.product.findMany).toHaveBeenCalledWith({
        include: {
          companyProduct: {
            select: {
              company: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });
      expect(result).toEqual([mockProduct]);
    });

    it('should throw error if prisma throws', async () => {
      jest
        .spyOn(prisma.product, 'findMany')
        .mockRejectedValue(new Error('DB error'));
      await expect(service.findAll()).rejects.toThrow(
        'Failed to fetch products'
      );
    });
  });

  describe('findOne', () => {
    it('should return a product by id', async () => {
      const result = await service.findOne(1);
      expect(prisma.product.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          companyProduct: {
            select: {
              company: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });
      expect(result).toEqual(mockProduct);
    });

    it('should throw error if prisma throws', async () => {
      jest
        .spyOn(prisma.product, 'findUnique')
        .mockRejectedValue(new Error('DB error'));
      await expect(service.findOne(1)).rejects.toThrow(
        'Failed to fetch product with id 1'
      );
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const result = await service.update(1, mockProduct);
      expect(prisma.product.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: mockProduct,
      });
      expect(result).toEqual(mockProduct);
    });

    it('should throw error if prisma throws', async () => {
      jest
        .spyOn(prisma.product, 'update')
        .mockRejectedValue(new Error('DB error'));
      await expect(service.update(1, {} as any)).rejects.toThrow(
        'Failed to update product with id 1'
      );
    });
  });

  describe('remove', () => {
    it('should delete a product', async () => {
      const result = await service.remove(1);
      expect(prisma.product.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual({ deleted: true });
    });

    it('should throw error if prisma throws', async () => {
      jest
        .spyOn(prisma.product, 'delete')
        .mockRejectedValue(new Error('DB error'));
      await expect(service.remove(1)).rejects.toThrow(
        'Failed to delete product with id 1'
      );
    });
  });
});
