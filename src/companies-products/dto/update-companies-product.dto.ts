import { PartialType } from '@nestjs/mapped-types';
import { CreateCompaniesProductDto } from './create-companies-product.dto';

export class UpdateCompaniesProductDto extends PartialType(CreateCompaniesProductDto) {}
