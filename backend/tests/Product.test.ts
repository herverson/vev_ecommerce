// const { uuid } = require("uuidv4");
import request from 'supertest';
import app from '../src/server_fake';
import db  from '../src/data/db_fake';

describe("products", () => {
  it("should get all products", async (done) => {
    const res = await request(app).get("/products");
    expect(res.status).toEqual(200);
    expect(db).toHaveLength(res.body.length);
    done();
  });
  it("should create a new product", async (done) => {
    const dbProductsLengthBefore = db.length;
    const newMockProduct = {
      title: "testePost",
      price: 123.32,
      description: "testepost",
      images: "jadghsdgjsdgajhsdgjhasgdjhasgdjhgasjdhgasdjhgasjdjasdad",
      quantity: 21,
    };
    const res = await request(app).post("/products").send(newMockProduct);
    expect(res.status).toEqual(200);
    const dbProductsLengthAfter = db.length;
    expect(dbProductsLengthBefore).toEqual(dbProductsLengthAfter - 1);
    done();
  });

  it("alter one product", async (done) => {
    const productId = db[0].id;
    const product = {
      id: productId,
      title: "testePost",
      price: 123.32,
      description: "testepost",
      images: "jjjjjjjj",
      quantity: 21,        
    };
    const res = await request(app).put(`/products/${productId}`).send(product);
    expect(res.status).toEqual(200);
    expect(res.body).toEqual(product);
    // verificar se o produto foi alterado 
    done();
  });

  it('should delete product id', async (done) => {
    const dbProductsLengthBefore = db.length;
    const productId = db[0].id;
    const res = await request(app).delete(`/products/${productId}`);
    expect(res.status).toEqual(200);
    const dbProductsLengthAfter = db.length;
    expect(dbProductsLengthBefore - 1).toEqual(dbProductsLengthAfter);
    done();
  })
});