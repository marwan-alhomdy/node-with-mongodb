const express = require('express');
const { addOrder, getOrder, getOrders, updateOrder, deleteOrder } = require("../controller/orderController")
const orderRouter = express.Router();

//!Order
orderRouter.post("/order/add-order", addOrder);
orderRouter.get("/order/get-order", getOrder);
orderRouter.get("/order/get-orders", getOrders);
orderRouter.delete("/order/delete-order", deleteOrder);
orderRouter.patch("/order/update-order", updateOrder);

module.exports = orderRouter;