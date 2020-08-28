"use strict";

//require the express module
const express = require("express");

//create a new router object
const routes = express.Router();

const cartItems = [
  { id: 1, product: "Earl Grey Scones", price: 2.5, quantity: 5 },
  { id: 2, product: "Honey Fig Buns", price: 1.5, quantity: 3 },
  { id: 3, product: "Raspberry Fudge", price: 3, quantity: 9 },
  { id: 4, product: "Rosemary Lemon Biscuits", price: 2, quantity: 2 },
  { id: 5, product: "Pain au Chocolat", price: 3, quantity: 5 },
];
let nextId = 6;

routes.get("/cart-items", (req, res) => {
  if (req.query.maxPrice) {
    let filteredItems = cartItems.filter((item) => {
      return item.price <= parseFloat(req.query.maxPrice);
    });
    res.json(filteredItems);
  } else if (req.query.prefix) {
    let matchedItems = cartItems.filter((item) => {
      let currentItem = item.product.toLowerCase();
      return currentItem.startsWith(req.query.prefix);
    });
    res.json(matchedItems);
  } else if (req.query.pageSize) {
    let results = cartItems.slice(0, parseInt(req.query.pageSize));
    res.json(results);
  }
  res.json(cartItems);
});
routes.get("/cart-items/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let found = cartItems.find((item) => {
    return item.id === id;
  });
  if (found) {
    res.json(found);
  } else {
    res.status(404);
    res.send(`Id: ${id} was not found fam`);
  }
});

routes.post("cart-items", (req, res) => {
  const item = req.body;
  item.id = nextId++;
  cartItems.push(item);
  res.status(201);
  res.json(item);
});

routes.put("/cart-items/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let index = items.findIndex((item) => {
    return item.id === id;
  });
  cartItems[index].id === id;
  cartItems[index] = req.body;
  res.status(200);
  res.json(cartItems[index]);
});

routes.delete("/cart-items/:id", (req, res) => {
  let id = parseInt(req.params.id);
  let index = cartItems.findIndex((item) => {
    return item.id === id;
  });
  cartItems.splice(index, 1);
  res.sendStatus(204);
});

//export routes for use in server.js
module.exports = routes;
