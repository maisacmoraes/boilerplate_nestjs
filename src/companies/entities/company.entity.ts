import { Company_Product } from 'generated/prisma';

export class Company {
  id: string;
  name: string;
  document: string;
  email: string;
  phone: string;
  products?: Company_Product[];
}
