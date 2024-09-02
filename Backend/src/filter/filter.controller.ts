import { Controller, Get, Query } from '@nestjs/common';
import { FilterService } from './filter.service';
import { Item } from '../item/item.iterface';

@Controller('filter')
export class FilterController {
  constructor(private readonly filterService: FilterService) {}

  @Get('price')
  async filterByPrice(
    @Query('minPrice') minPrice: number,
    @Query('maxPrice') maxPrice: number,
  ): Promise<Item[]> {
    return this.filterService.filterByPrice(minPrice, maxPrice);
  }
}
