import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from '../companies.service';
import { PrismaService } from '../../database/prisma.service';
import { mockCompany } from './mocks';

describe('CompaniesService', () => {
  let service: CompaniesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompaniesService,
        {
          provide: PrismaService,
          useValue: {
            company: {
              create: jest.fn().mockResolvedValue(mockCompany),
              findMany: jest.fn().mockResolvedValue([mockCompany]),
              findUnique: jest.fn().mockResolvedValue(mockCompany),
              update: jest.fn().mockResolvedValue(mockCompany),
              delete: jest.fn().mockResolvedValue({ deleted: true }),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CompaniesService>(CompaniesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a company', async () => {
      await expect(service.create(mockCompany)).resolves.toEqual(mockCompany);
      expect(prisma.company.create).toHaveBeenCalledWith({ data: mockCompany });
    });

    it('should throw error if prisma fails', async () => {
      jest.spyOn(prisma.company, 'create').mockRejectedValue(new Error('fail'));
      await expect(service.create({} as any)).rejects.toThrow(
        'Failed to create company'
      );
    });
  });

  describe('findAll', () => {
    it('should return all companies', async () => {
      await expect(service.findAll()).resolves.toEqual([mockCompany]);
      expect(prisma.company.findMany).toHaveBeenCalled();
    });

    it('should throw error if prisma fails', async () => {
      jest
        .spyOn(prisma.company, 'findMany')
        .mockRejectedValue(new Error('fail'));
      await expect(service.findAll()).rejects.toThrow(
        'Failed to fetch companies'
      );
    });
  });

  describe('findOne', () => {
    it('should return a company by id', async () => {
      await expect(service.findOne(1)).resolves.toEqual(mockCompany);
      expect(prisma.company.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw error if prisma fails', async () => {
      jest
        .spyOn(prisma.company, 'findUnique')
        .mockRejectedValue(new Error('fail'));
      await expect(service.findOne(1)).rejects.toThrow(
        'Failed to fetch company with id 1'
      );
    });
  });

  describe('update', () => {
    it('should update a company', async () => {
      await expect(service.update(1, mockCompany)).resolves.toEqual(
        mockCompany
      );
      expect(prisma.company.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: mockCompany,
      });
    });

    it('should throw error if prisma fails', async () => {
      jest.spyOn(prisma.company, 'update').mockRejectedValue(new Error('fail'));
      await expect(service.update(1, {} as any)).rejects.toThrow(
        'Failed to update company with id 1'
      );
    });
  });

  describe('remove', () => {
    it('should delete a company', async () => {
      await expect(service.remove(1)).resolves.toEqual({ deleted: true });
      expect(prisma.company.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw error if prisma fails', async () => {
      jest.spyOn(prisma.company, 'delete').mockRejectedValue(new Error('fail'));
      await expect(service.remove(1)).rejects.toThrow(
        'Failed to delete company with id 1'
      );
    });
  });
});
