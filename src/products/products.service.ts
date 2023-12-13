import {Injectable} from "@nestjs/common";
import {Product} from "./product.model";

@Injectable()
export class ProductsService {
    private products: Product[] = [];

    insertProduct(title: string, description: string, price: number) {
        const productID: string = new Date().toString();
        const newProduct = new Product(productID, title, description, price); // date have taken as the id
        this.products.push(newProduct);
        return productID;
    }

    getProducts() {
        return [...this.products];
    }
}