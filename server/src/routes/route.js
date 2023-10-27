
const express = require("express");
const route = express.Router();


const UserController = require("../controller/auth.controller");
const ProductController = require("../controller/product.controller");
const CartController = require("../controller/cart.controller")
const OrderController = require("../controller/order.controller")
const MainProductsController = require("../controller/MainProduct.controller")



// auth
route.post("/create/user", UserController.createItem)
route.post("/read/user", UserController.readAllItems)
route.post("/update/user", UserController.updateItem)
route.post("/delete/user", UserController.deleteItem)
route.post("/login/user", UserController.login)

//product
route.post("/create/product", ProductController.createItem)
route.get("/get/products", ProductController.readAllItems)


// cart 
route.post("/add/cart", CartController.createItem)
route.get("/get/cart", CartController.readAllItems)
route.post("/delete/cart", CartController.deleteItem)
route.post("/increase/qty", CartController.IncreaseQty)


// order
route.post("/create/order", OrderController.createOrder)
route.get("/get/order", OrderController.getOrderData)

// main data route
route.get("/get/all/data", MainProductsController?.ReadData)
route.get("/get/brands/list", MainProductsController?.BrandList)
route.get("/get/categories/list", MainProductsController?.CategoryList)
route.get("/get/products/list", MainProductsController?.ProductsList)
route.get("/get/men/list", MainProductsController?.MenFationList)
route.get("/get/women/list", MainProductsController?.WomenFationList)
route.get("/get/electronics/list", MainProductsController?.ElctronicsList)
route.get("/get/banner/list", MainProductsController?.BannerData)
route.post("/get/product/by/id", MainProductsController?.FindDataById)




module.exports = route;

