// // import { v4 as uuidv4 } from 'uuid';
// import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// @Entity('products')
// class Product {
//     @PrimaryGeneratedColumn('uuid')
//     id: string;

//     @Column()
//     title: string;

//     @Column()
//     description: string;

//     @Column('number')
//     price: Number;

//     @Column()
//     images: string;

//     // constructor({ title, description, price, images}: Omit<Product, 'id'>) {
//     //     this.id = uuidv4();
//     //     this.title = title;
//     //     this.description = description;
//     //     this.price = price;
//     //     this.images = images;
//     // }
// }

// export default Product;