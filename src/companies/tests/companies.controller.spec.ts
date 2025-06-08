import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesController } from '../companies.controller';
import { CompaniesService } from '../companies.service';
import { PrismaService } from '../../database/prisma.service';
import { Company } from '@prisma/client';

const mockCompany: Company = {
  id: 1,
  name: 'Acme Corp',
  document: '1234567890',
  email: 'contact@acme.com',
  phone: '+55 11 99999-9999',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const id = mockCompany.id.toString();

describe('CompaniesController', () => {
  let controller: CompaniesController;
  let companiesService: CompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesController],
      providers: [
        {
          provide: CompaniesService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockCompany),
            findAll: jest.fn().mockResolvedValue([mockCompany]),
            findOne: jest.fn().mockResolvedValue(mockCompany),
            update: jest.fn().mockResolvedValue(mockCompany),
            remove: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
        { provide: PrismaService, useValue: {} },
      ],
    }).compile();

    controller = module.get<CompaniesController>(CompaniesController);
    companiesService = module.get<CompaniesService>(CompaniesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call companiesService.create with correct dto and return result', async () => {
      expect(await controller.create(mockCompany)).toEqual(mockCompany);
      expect(companiesService.create).toHaveBeenCalledWith(mockCompany);
    });
  });

  describe('findAll', () => {
    it('should call companiesService.findAll and return result', async () => {
      expect(await controller.findAll()).toEqual([mockCompany]);
      expect(companiesService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should call companiesService.findOne with correct id and return result', async () => {
      expect(await controller.findOne(id)).toEqual(mockCompany);
      expect(companiesService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should call companiesService.update with correct id and dto and return result', async () => {
      expect(await controller.update(id, mockCompany)).toEqual(mockCompany);
      expect(companiesService.update).toHaveBeenCalledWith(1, mockCompany);
    });
  });

  describe('remove', () => {
    it('should call companiesService.remove with correct id and return result', async () => {
      const result = { deleted: true };

      expect(await controller.remove(id)).toEqual(result);
      expect(companiesService.remove).toHaveBeenCalledWith(1);
    });
  });
});
