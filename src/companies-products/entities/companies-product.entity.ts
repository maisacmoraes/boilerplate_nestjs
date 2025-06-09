import { Prisma } from '@prisma/client';
import { DecimalJsLike } from 'generated/prisma/runtime/library';

export class CompaniesProduct
  implements Prisma.Company_ProductUncheckedCreateInput
{
  id?: number | undefined;
  companyId: number;
  productId: number;
  price: string | number | Prisma.Decimal | DecimalJsLike;
  createdAt?: string | Date | undefined;
  updatedAt?: string | Date | undefined;
}
