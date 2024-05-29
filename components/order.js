var express = require("express");
var router = express.Router();
const {
  createOrderMiddleware,
  getOrderByUserMiddleware,
  updateOrderMiddleware,
} = require("../middle_ware/order");
const { auth } = require("../middle_ware/auth");
const { sendResponse } = require("../middle_ware/user");

router.get("/all", [auth, getOrderByUserMiddleware, sendResponse]);

router.post("/neworder", [auth, createOrderMiddleware, sendResponse]);

router.post("/updateorder", [auth, updateOrderMiddleware, sendResponse]);

module.exports = router;
