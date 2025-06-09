import { Decimal } from '@prisma/client/runtime/library';

export const mockProduct = {
  id: 1,
  name: 'Sample Product',
  description: 'A sample product description.',
  base_price: new Decimal(99.99),
  stock: 100,
  createdAt: new Date(),
  updatedAt: new Date(),
  companyProduct: undefined,
};
