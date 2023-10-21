import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { OfferEntity } from './offer.entity.js';

export interface OfferServiceInterface {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findByOfferId(categoryId: string): Promise<DocumentType<OfferEntity> | null>;
  findByOfferName(categoryName: string): Promise<DocumentType<OfferEntity> | null>;
  findByOfferNameOrCreate(categoryName: string, dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
}
