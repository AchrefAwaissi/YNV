import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilterService } from './filter.service';
import { FilterController } from './filter.controller';
import { ItemModule } from '../item/item.module'; // Assure-toi que le chemin est correct
import { ItemSchema } from 'src/item/item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Item', schema: ItemSchema }]), // Schéma Item
    ItemModule, // Si tu veux réutiliser d'autres éléments du module Item
  ],
  providers: [FilterService],
  controllers: [FilterController],
})
export class FilterModule {}
