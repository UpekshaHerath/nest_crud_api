import {Controller, Post, Body, Get, Param, Patch, Delete} from "@nestjs/common";
import {ProductsService} from "./products.service";

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) {}

    @Post()
    async addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDescription: string,
        @Body('price') prodPrice: number
    ) {
        const generatedID = await this.productService.insertProduct(prodTitle, prodDescription, prodPrice);
        return { id: generatedID }
    }

    @Get()
    async getAllProducts() {
        const products = await this.productService.getProducts();
        return products;
    }

    @Get(':id')
    getSingleProduct(@Param('id') productId: string) {
        return this.productService.getSingleProduct(productId);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') productId: string,
        @Body('title') productTitle: string,
        @Body('description') productDescription: string,
        @Body('price') productPrice: number
    ) {
        return this.productService.updateProduct(productId, productTitle, productDescription, productPrice);
    }

    @Delete(':id')
    deleteProduct(@Param('id') productId: string) {
        return this.productService.deleteProduct(productId);
    }
}