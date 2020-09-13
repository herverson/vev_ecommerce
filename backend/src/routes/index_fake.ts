import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import products from '../data/db_fake';


const routes = express.Router();
routes.get("/products", (req, res) => {
    const { title } = req.query;
    const results = title
        ? products.filter((product) => product.title.includes(title.toString()))
        : products;

    return res.json(results);
});

routes.post("/products", (req, res) => {
    // console.log(req, res);
    const { title, price, description, images, quantity } = req.body;
    const product = {
        id: uuidv4(),
        title,
        price,
        description,
        images,
        quantity,
    };
    products.push(product);
    return res.json(product);
});

routes.put("/products/:id", (req, res) => {
    const { id } = req.params;
    const { title, price, description, images, quantity } = req.body;

    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex < 0) {
        return res.status(400).json({ error: "Product not found!" });
    }

    const product = {
        id,
        title,
        price,
        description,
        images,
        quantity,
    };

    products[productIndex] = product;

    return res.json(product);
});

routes.delete("/products/:id", (req, res) => {
    const { id } = req.params;
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex < 0) {
        return res.status(400).json({ error: "Product not found!" });
    }

    products.splice(productIndex, 1);
    return res.status(200).send();
});

export default routes;