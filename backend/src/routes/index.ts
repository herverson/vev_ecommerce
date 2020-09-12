import express from 'express';
import db from '../data/conn';
import { v4 as uuidv4 } from 'uuid';

const routes = express.Router();

routes.get("/products", async (req, res) => {
  const { title } = req.query;

  const products = await db('products');

  const results = title
    ? products.filter((product) => product.title.includes(title.toString()) || product.description.includes(title.toString()))
    : products;

  return res.json(results);
});

routes.post("/products", async (req, res) => {
  const {
    title,
    description,
    price,
    images,
    quantity
  } = req.body;

  const product = {
    id: uuidv4(),
    title,
    description,
    price,
    images,
    quantity
  };

  await db('products').insert(product);

  return res.json(product);

});

routes.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    price,
    images,
    quantity
  } = req.body;
  
  const product = {
    title,
    price,
    description,
    images,
    quantity,
  };

  db('products').where('id', '=', id).update(product).then(function(result) {
    
    if (result === 0) {
      return res.status(400).json({ error: "Product not found!" });
    }

    return res.json(product);
  });

});

routes.delete("/products/:id", (req, res) =>{
  const {id} = req.params;

  db('products').where('id', '=', id).delete().then(function(result) {
    
    if (result === 0) {
      return res.status(400).json({ error: "Product not found!" });
    }

    return res.status(204).send();
  });  
  
});

export default routes;