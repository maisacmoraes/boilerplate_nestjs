import { Company } from 'generated/prisma';
import { Decimal } from 'generated/prisma/runtime/library';

export class Product {
  id: string;
  name: string;
  description: string;
  base_price: Decimal;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  companies?: Company[];
}
