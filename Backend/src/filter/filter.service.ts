import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item } from '../item/item.iterface';

@Injectable()
export class FilterService {
  constructor(@InjectModel('Item') private itemModel: Model<Item>) {}

  async filterByPrice(minPrice?: number, maxPrice?: number): Promise<Item[]> {
    const filter = {};

    if (minPrice !== undefined) {
      filter['price'] = { $gte: minPrice };
    }
    if (maxPrice !== undefined) {
      filter['price'] = { ...filter['price'], $lte: maxPrice };
    }

    return this.itemModel.find(filter).exec();
  }
}
