import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";
import { InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    constructor(@InjectModel('Product') private readonly productModel: Model<Product>) {
    }

    async insertProduct(title: string, description: string, price: number) {
        const newProduct = new this.productModel({ title, description, price }); // date have taken as the id
        const result = await newProduct.save();
        return result.id as string;
    }

    async getProducts() {
        const result = await this.productModel.find().exec();
        return result as Product[];
    }

    getSingleProduct(productId: string) {
        const product = this.findProduct(productId)[0];
        return { ...product };
    }

    updateProduct(productId: string, productTitle: string, productDescription: string, productPrice: number) {
        const [ product, index ] = this.findProduct(productId);
        const updateProduct = product;
        if (productTitle) {
            updateProduct.title = productTitle;
        }
        if (productDescription) {
            updateProduct.description = productDescription;
        }
        if (productPrice) {
            updateProduct.price = productPrice;
        }
        this.products[index] = updateProduct;
        return { ...updateProduct };
    }

    deleteProduct(productId: string) {
        const index = this.findProduct(productId)[1];
        const deletedProduct = this.products.splice(index, 1); // this will remove the product
        return { ...deletedProduct };
    }

    private findProduct(id: string): [Product, number] {
        const productIndex = this.products.findIndex((prod) => prod.id === id);
        const product = this.products[productIndex];
        if (!product) {
            throw new NotFoundException('Could not find product');
        }
        return [product, productIndex];
    }
}