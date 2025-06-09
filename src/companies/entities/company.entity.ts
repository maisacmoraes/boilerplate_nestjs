import { Prisma } from '@prisma/client';
import { Company_Product } from 'generated/prisma';

export class Company implements Prisma.CompanyUncheckedCreateInput {
  id?: number | undefined;
  name: string;
  document: string;
  email: string;
  phone: string;
  createdAt?: string | Date | undefined;
  updatedAt?: string | Date | undefined;
  companyProduct?:
    | Prisma.Company_ProductUncheckedCreateNestedManyWithoutCompanyInput
    | undefined;
}
