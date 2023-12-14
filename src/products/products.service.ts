import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";
import { InjectModel} from "@nestjs/mongoose";
import {Document, Model, Types} from "mongoose";

@Injectable()
export class ProductsService {
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {
    }

    async insertProduct(title: string, description: string, price: number) {
        const newProduct = new this.productModel({title, description, price});
        const result = await newProduct.save();
        return result.id as string;
    }

    async getProducts() {
        const products = await this.productModel.find().exec();
        return products.map(prod => ({
            id: prod.id,
            title: prod.title,
            description: prod.description,
            price: prod.price
        }));
    }

    async getSingleProduct(productId: string) {
        const product = await this.findProduct(productId);
        return { id: product.id, title: product.title, description: product.description, price: product.price };
    }

    async updateProduct(productId: string, productTitle: string, productDescription: string, productPrice: number) {
        const updatedProduct = await this.findProduct(productId);
        if (productTitle) {
            updatedProduct.title = productTitle;
        }
        if (productDescription) {
            updatedProduct.description = productDescription;
        }
        if (productPrice) {
            updatedProduct.price = productPrice;
        }
        await updatedProduct.save();
        return updatedProduct;
    }

    async deleteProduct(prodId: string) {
        const result = await this.productModel.deleteOne({_id: prodId}).exec();
        if (result.deletedCount === 0) {
            throw new NotFoundException('Could not find product.');
        }
        return result;
    }

    private async findProduct(id: string): Promise<Product> {
        let product;
        try {
            product = await this.productModel.findById(id).exec();
            console.log(product);
        } catch (error) {
            throw new NotFoundException('Could not find product');
        }
        if (!product) {
            throw new NotFoundException('Could not find product');
        }
        return product;
    }

}