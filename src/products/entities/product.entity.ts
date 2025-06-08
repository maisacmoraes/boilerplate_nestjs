import { Prisma } from '@prisma/client';
import { Company } from 'generated/prisma';
import { Decimal } from 'generated/prisma/runtime/library';

export class Product implements Prisma.ProductUncheckedCreateInput {
  id?: number | undefined;
  name: string;
  description: string;
  base_price: Decimal;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
  companyProduct?:
    | Prisma.Company_ProductUncheckedCreateNestedManyWithoutProductInput
    | undefined;
}
