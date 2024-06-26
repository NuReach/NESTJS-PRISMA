import { DatabaseService } from './../database/database.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private readonly databaseService: DatabaseService) {}
  async createService(createProductDto: Prisma.ProductCreateInput) {
    return this.databaseService.product.create({
      data: createProductDto,
      include: { reviews: true },
    });
  }

  async findAllService() {
    return this.databaseService.product.findMany({
      include: { reviews: true },
    });
  }

  async findOneSerivce(id: number) {
    return this.databaseService.product.findUnique({
      where: {
        id,
      },
    });
  }

  async updateService(id: number, updateProductDto: Prisma.ProductUpdateInput) {
    return this.databaseService.product.update({
      where: {
        id,
      },
      data: updateProductDto,
      include: { reviews: true },
    });
  }

  async removeService(id: number) {
    return this.databaseService.product.delete({
      where: {
        id,
      },
    });
  }
}
