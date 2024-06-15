import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Prisma } from '@prisma/client';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createController(@Body() createProductDto: Prisma.ProductCreateInput) {
    return this.productsService.createService(createProductDto);
  }

  @Get()
  async findAllController() {
    return this.productsService.findAllService();
  }

  @Get(':id')
  async findOneController(@Param('id') id: string) {
    return this.productsService.findOneSerivce(+id);
  }

  @Patch(':id')
  updateController(
    @Param('id') id: string,
    @Body() updateProductDto: Prisma.ProductUpdateInput,
  ) {
    return this.productsService.updateService(+id, updateProductDto);
  }

  @Delete(':id')
  removeController(@Param('id') id: string) {
    return this.productsService.removeService(+id);
  }
}
