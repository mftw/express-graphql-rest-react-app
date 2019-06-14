const express = require("express");
const router = express.Router();

const ProductGroupsController = require("../controllers/productGroups");
const checkAuth = require("../middleware/check-auth");

router.get("/", ProductGroupsController.productgroups_get_all);

router.get(
  "/products",
  ProductGroupsController.productgroups_get_all_and_products
);

router.get(
  "/products/:productGroupId",
  ProductGroupsController.productgroups_get_productgroup_and_products
);

router.get(
  "/:productGroupId",
  ProductGroupsController.productgroups_get_productgroup
);

router.post(
  "/",
  checkAuth,
  checkAuth.superuser,
  ProductGroupsController.productgroups_create_productgroup
);

router.delete(
  "/:productGroupId",
  checkAuth,
  checkAuth.superuser,
  ProductGroupsController.productgroups_delete_productgroup
);

module.exports = router;
