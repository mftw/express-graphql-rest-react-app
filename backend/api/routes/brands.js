const express = require("express");
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const brandsController = require('../controllers/brands');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/brands');
    // cb(null, '/uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    const error = Error('Invalid image file type');
    error.status = 401;
    cb(error, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

router.get("/", brandsController.brands_get_all);

router.get("/products", brandsController.brands_and_products_get_all);

router.post("/", checkAuth, checkAuth.superuser, upload.single('brandImage'), brandsController.brands_create_brand);

router.get("/:brandId", brandsController.brands_get_brand);

router.get("/products/:brandId", brandsController.brands_get_brand_and_products);

router.patch("/:brandId", checkAuth, checkAuth.superuser, brandsController.brands_update_brand);

router.delete("/:brandId", checkAuth, checkAuth.superuser, brandsController.brands_delete);

module.exports = router;
