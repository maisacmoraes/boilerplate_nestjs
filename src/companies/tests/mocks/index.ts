import { Company } from '@prisma/client';

export const mockCompany: Company = {
  id: 1,
  name: 'Acme Corp',
  document: '1234567890',
  email: 'contact@acme.com',
  phone: '+55 11 99999-9999',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const id = mockCompany.id.toString();
