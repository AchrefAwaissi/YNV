import { Module } from '@nestjs/common';
import { DatabaseModule } from './databse.module';
import { ItemModule } from './item/item.module';
import { FilterModule } from './filter/filter.module';

@Module({
  imports: [DatabaseModule, ItemModule, FilterModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
